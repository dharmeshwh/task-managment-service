import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("task_entity")
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({
    name: "user_id",
    type: "uuid",
  })
  userId: string;

  @Column({ name: "title", type: "varchar" })
  title: string;

  @Column({ name: "description", type: "varchar" })
  description: string;

  @Column({ name: "priority", type: "varchar" })
  priority: string;

  @Column({ name: "due_date", type: "timestamp" })
  dueDate: Date;

  @Column({ default: false, name: "is_completed", type: "boolean" })
  isComplete: boolean;
}
