import { create } from "zustand";
import {
  type FlowAnswers,
  type QuestionId,
  type StepId,
} from "./flow-data";
import {
  getNextStepId,
  getPrevStepId,
  toggleMultiAnswer,
} from "./flow-resolver";
import { getStepById } from "./flow-data";

interface FlowState {
  currentStepId: StepId;
  answers: FlowAnswers;
  setSingleAnswer: (id: QuestionId, value: string) => void;
  toggleMultiSelect: (id: QuestionId, value: string, exclusiveId?: string) => void;
  goNext: () => void;
  goBack: () => void;
  restart: () => void;
}

const INITIAL_STEP: StepId = "welcome";

export const useFlowStore = create<FlowState>((set, get) => ({
  currentStepId: INITIAL_STEP,
  answers: {},

  setSingleAnswer: (id, value) =>
    set((state) => ({
      answers: { ...state.answers, [id]: value },
    })),

  toggleMultiSelect: (id, value, exclusiveId) =>
    set((state) => {
      const current = state.answers[id];
      const next = toggleMultiAnswer(
        Array.isArray(current) ? current : undefined,
        value,
        exclusiveId,
      );
      return {
        answers: {
          ...state.answers,
          [id]: next.length > 0 ? next : undefined,
        },
      };
    }),

  goNext: () => {
    const { currentStepId, answers } = get();
    const nextId = getNextStepId(currentStepId, answers);
    if (nextId) set({ currentStepId: nextId });
  },

  goBack: () => {
    const { currentStepId, answers } = get();
    const prevId = getPrevStepId(currentStepId, answers);
    if (prevId) set({ currentStepId: prevId });
  },

  restart: () => set({ currentStepId: INITIAL_STEP, answers: {} }),
}));

export function useCurrentStep() {
  const stepId = useFlowStore((s) => s.currentStepId);
  return getStepById(stepId);
}
