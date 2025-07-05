import { useSchedule } from '@/hooks/useSchedule';
import { ScheduleTable } from './schedule/ScheduleTable';

export const ScheduleManager = () => {
  const { staff, schedule, addStaff, removeStaff, updateSchedule, moveStaff } = useSchedule();

  return (
    <div className="container mx-auto p-4">
      <ScheduleTable
        staff={staff}
        schedule={schedule}
        onUpdateSchedule={updateSchedule}
        onMoveStaff={moveStaff}
        onRemoveStaff={removeStaff}
        onAddStaff={addStaff}
      />
    </div>
  );
};