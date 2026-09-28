import React from 'react';
import { BengaliPenDiagram } from './BengaliPenDiagram';
import { LifeScienceHeartDiagram } from './LifeScienceHeartDiagram';
import { PhysicsRealWorldDiagram } from './PhysicsRealWorldDiagram';
import { MathDiagram } from './MathDiagram';
import {
  HistoryTimelineDiagram,
  GeographyTectonicsDiagram,
  EnglishStoryArcDiagram,
  CSArchitectureDiagram,
} from './OtherSubjectDiagrams';

interface SubjectMasterVisualDiagramProps {
  subjectId: string;
  onPracticeClick?: () => void;
}

export const SubjectMasterVisualDiagram: React.FC<SubjectMasterVisualDiagramProps> = ({
  subjectId,
  onPracticeClick,
}) => {
  switch (subjectId) {
    case 'sub_beng':
      return <BengaliPenDiagram onPracticeClick={onPracticeClick} />;
    case 'sub_life':
      return <LifeScienceHeartDiagram />;
    case 'sub_phys':
      return <PhysicsRealWorldDiagram />;
    case 'sub_math':
      return <MathDiagram />;
    case 'sub_hist':
      return <HistoryTimelineDiagram />;
    case 'sub_geog':
      return <GeographyTectonicsDiagram />;
    case 'sub_eng':
      return <EnglishStoryArcDiagram />;
    case 'sub_cs':
      return <CSArchitectureDiagram />;
    default:
      return <MathDiagram />;
  }
};
