import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SiteData, PortfolioWebsite, FormInquiry, defaultSiteData } from '../data/siteContent';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, onSnapshot, collection, deleteDoc } from 'firebase/firestore';

interface SiteContentContextType {
  data: SiteData;
  updateData: (fields: Partial<SiteData>) => void;
  updateNested: (path: string, value: any) => void;
  updateLogo: (img: string) => void;
  updateLogoScale: (scale: number) => void;
  addWebsite: (site: Omit<PortfolioWebsite, 'id'>) => void;
  deleteWebsite: (id: string) => void;
  addInquiry: (inq: Omit<FormInquiry, 'id' | 'createdAt' | 'status'>) => void;
  deleteInquiry: (id: string) => void;
  toggleInquiryStatus: (id: string) => void;
  resetToDefault: () => void;
  importData: (imported: SiteData) => void;
  isSaved: boolean;
  isCloudSynced: boolean;
}

const STORAGE_KEY = 'ayas_clean_site_v5';

const DEMO_WEBSITE_IDS = new Set([
  'ayas-web-corner',
  'rose-and-bloom',
  'the-daily-knead',
  'atelier-noord'
]);

function filterOutDemoData(siteData: SiteData): SiteData {
  const cleanWebsites = (siteData.websites || []).filter(
    (w) => !DEMO_WEBSITE_IDS.has(w.id)
  );
  const cleanInquiries = (siteData.inquiries || []).filter(
    (i) => i.id !== 'inq-sample-1'
  );
  return {
    ...siteData,
    websites: cleanWebsites,
    inquiries: cleanInquiries
  };
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

// Helper for non-destructive deep merge
function mergeDeep(target: any, source: any): any {
  if (!source) return target;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined && source[key] !== null) {
      if (
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        target[key] &&
        typeof target[key] === 'object' &&
        !Array.isArray(target[key])
      ) {
        output[key] = mergeDeep(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ayas_clean_site_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = mergeDeep(defaultSiteData, parsed);
        return filterOutDemoData(merged);
      }
    } catch (e) {
      console.warn('Could not load stored data', e);
    }
    return defaultSiteData;
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const isFirstLoadRef = useRef(true);

  // Helper to save to Firestore
  const saveToFirestore = async (newData: SiteData) => {
    try {
      const sanitized = JSON.parse(JSON.stringify(newData));
      // Remove inquiries from site content doc (inquiries live in their own collection)
      delete sanitized.inquiries;
      await setDoc(doc(db, 'site', 'content'), sanitized, { merge: true });
      setIsCloudSynced(true);
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 2000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.warn('Could not sync to Firestore:', err);
    }
  };

  // Real-time synchronization with Firestore (both site content and customer inquiries)
  useEffect(() => {
    // 1. Subscribe to real-time site content updates from Firestore
    const contentDocRef = doc(db, 'site', 'content');
    const unsubContent = onSnapshot(
      contentDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data();
          setData((prev) => {
            const merged = mergeDeep(prev, remoteData);
            const cleaned = filterOutDemoData(merged);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
            } catch (e) {
              console.warn(e);
            }
            return cleaned;
          });
          setIsCloudSynced(true);
        } else if (isFirstLoadRef.current) {
          // If first time ever and Firestore is empty, seed it with current local data
          isFirstLoadRef.current = false;
          saveToFirestore(data);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'site/content');
      }
    );

    // 2. Subscribe to real-time inquiries from Firestore
    const inquiriesColRef = collection(db, 'inquiries');
    const unsubInquiries = onSnapshot(
      inquiriesColRef,
      (snapshot) => {
        const remoteInquiries: FormInquiry[] = [];
        snapshot.forEach((docSnap) => {
          remoteInquiries.push({ id: docSnap.id, ...docSnap.data() } as FormInquiry);
        });
        // Sort newest first
        remoteInquiries.sort((a, b) => (b.id > a.id ? 1 : -1));
        setData((prev) => ({
          ...prev,
          inquiries: remoteInquiries
        }));
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'inquiries');
      }
    );

    return () => {
      unsubContent();
      unsubInquiries();
    };
  }, []);

  // Save to localStorage as quick local cache whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  const updateData = (fields: Partial<SiteData>) => {
    setData((prev) => {
      const next = { ...prev, ...fields };
      saveToFirestore(next);
      return next;
    });
  };

  const updateNested = (path: string, value: any) => {
    setData((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current: any = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      saveToFirestore(clone);
      return clone;
    });
  };

  const updateLogo = (img: string) => {
    setData((prev) => {
      const next = { ...prev, logoImage: img };
      saveToFirestore(next);
      return next;
    });
  };

  const updateLogoScale = (scale: number) => {
    setData((prev) => {
      const next = { ...prev, logoScale: scale };
      saveToFirestore(next);
      return next;
    });
  };

  const addWebsite = (site: Omit<PortfolioWebsite, 'id'>) => {
    const newItem: PortfolioWebsite = {
      ...site,
      id: `website-${Date.now()}`
    };
    setData((prev) => {
      const next = {
        ...prev,
        websites: [newItem, ...prev.websites]
      };
      saveToFirestore(next);
      return next;
    });
  };

  const deleteWebsite = (id: string) => {
    setData((prev) => {
      const next = {
        ...prev,
        websites: prev.websites.filter((w) => w.id !== id)
      };
      saveToFirestore(next);
      return next;
    });
  };

  const addInquiry = (inq: Omit<FormInquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newInquiry: FormInquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      createdAt: dateStr,
      status: 'nieuw'
    };

    // Save directly to Firestore inquiries collection
    setDoc(doc(db, 'inquiries', newInquiry.id), newInquiry).catch((err) => {
      console.warn('Failed to save inquiry to Firestore:', err);
    });

    setData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...(prev.inquiries || [])]
    }));
  };

  const deleteInquiry = (id: string) => {
    deleteDoc(doc(db, 'inquiries', id)).catch((err) => {
      console.warn('Failed to delete inquiry from Firestore:', err);
    });
    setData((prev) => ({
      ...prev,
      inquiries: (prev.inquiries || []).filter((item) => item.id !== id)
    }));
  };

  const toggleInquiryStatus = (id: string) => {
    const target = (data.inquiries || []).find((item) => item.id === id);
    const newStatus = target?.status === 'nieuw' ? 'behandeld' : 'nieuw';
    setDoc(doc(db, 'inquiries', id), { status: newStatus }, { merge: true }).catch((err) => {
      console.warn('Failed to update inquiry status in Firestore:', err);
    });
    setData((prev) => ({
      ...prev,
      inquiries: (prev.inquiries || []).map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    }));
  };

  const importData = (imported: SiteData) => {
    if (!imported) return;
    const merged = mergeDeep(defaultSiteData, imported);
    setData(merged);
    saveToFirestore(merged);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      console.error(e);
    }
  };

  const resetToDefault = () => {
    setData(defaultSiteData);
    saveToFirestore(defaultSiteData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        data,
        updateData,
        updateNested,
        updateLogo,
        updateLogoScale,
        addWebsite,
        deleteWebsite,
        addInquiry,
        deleteInquiry,
        toggleInquiryStatus,
        resetToDefault,
        importData,
        isSaved,
        isCloudSynced
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
};
