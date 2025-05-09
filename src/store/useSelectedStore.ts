// src/store/useSelectedStore.ts
import { create } from 'zustand';

type SelectedState = {
    selectedRegion: string | null;
    selectedSubArea: string | null;
    selectedProgramTarget: string | null; // 추가된 부분
    selectedProgramType: string | null; // 추가된 부분
    selectedInstitution: string | null; // 추가된 부분
    selectedConsulting: string | null;
    selectedExpertId: string | null;
    setSelectedRegion: (region: string | null) => void;
    setSelectedSubArea: (subArea: string | null) => void;
    setSelectedProgramTarget: (program: string | null) => void; // 추가된 부분
    setSelectedProgramType: (programType: string | null) => void; // 추가된 부분
    setSelectedInstitution: (institution: string | null) => void; // 추가된 부분
    setSelectedConsulting: (consulting: string | null) => void;
    setSelectedExpertId: (expertId: string | null) => void;
    reset: () => void;
};

const useSelectedStore = create<SelectedState>((set) => ({
    selectedRegion: null,
    selectedSubArea: null,
    selectedProgramTarget: null, // 추가된 부분
    selectedProgramType: null, // 추가된 부분
    selectedInstitution: null, // 추가된 부분
    selectedConsulting: null,
    selectedExpertId: null,
    setSelectedRegion: (region) => set({ selectedRegion: region, selectedSubArea: null }),
    setSelectedSubArea: (subArea) => set({ selectedSubArea: subArea }),
    setSelectedProgramTarget: (program) => set({ selectedProgramTarget: program }), // 추가된 부분
    setSelectedProgramType: (programType) => set({ selectedProgramType: programType }),
    setSelectedInstitution: (institution) => set({ selectedInstitution: institution }),
    setSelectedConsulting: (consulting) => set({ selectedConsulting: consulting }),
    setSelectedExpertId: (expertId) => set({ selectedExpertId: expertId }),
    reset: () => set({ selectedRegion: null, selectedSubArea: null, selectedProgramTarget: null }),
}));

export default useSelectedStore;