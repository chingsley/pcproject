import styled from 'styled-components';
import type { HistoryItemEntry } from '../../../../store/slices/historySlice';
import HistoryItem from './HistoryItem';

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
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
