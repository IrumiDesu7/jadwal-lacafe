import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface StaffManagerProps {
  onAddStaff: (name: string) => void;
}

export const StaffManager = ({ onAddStaff }: StaffManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStaffName.trim()) {
      onAddStaff(newStaffName.trim());
      setNewStaffName('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Staff
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Staff Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nama staff"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={!newStaffName.trim()}>
              Tambah
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};