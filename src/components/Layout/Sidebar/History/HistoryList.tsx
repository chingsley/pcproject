import styled from 'styled-components';
import type { HistoryItemEntry } from '../../../../store/slices/historySlice';
import HistoryItem from './HistoryItem';
import { drawBorder } from '../../../../utils/playground';

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow-y: auto;
  border: ${drawBorder('blue')};
`;

export interface HistoryListProps {
  items: HistoryItemEntry[];
  selectedId: string | null;
  onSelectItem: (id: string) => void;
}

const HistoryList = ({ items, selectedId, onSelectItem }: HistoryListProps) => {
  return (
    <List>
      {items.map((item) => (
        <HistoryItem
          key={item.id}
          title={item.title}
          points={item.points}
          active={selectedId === item.id}
          onClick={() => onSelectItem(item.id)}
        />
      ))}
    </List>
  );
};

export default HistoryList;
