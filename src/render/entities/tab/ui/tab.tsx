import type { CSSProperties, HTMLAttributes } from "react";
import { clsx } from 'clsx';
import cls from './tab.module.sass';
import { IoMdClose } from "react-icons/io";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState } from 'react';

interface ITabProps extends HTMLAttributes<HTMLButtonElement> {
  id: string;
  title: string;
  active?: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const Tab: React.FC<ITabProps> = ({
  id,
  title,
  active = false,
  onClose,
  onClick,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<number | null>(null);

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseDown = () => {
    // Запускаем таймер для определения, был ли это клик или начало перетаскивания
    timerRef.current = window.setTimeout(() => {
      setIsDragging(true); // Если таймер истек, это перетаскивание
    }, 200); // Задержка 200 мс
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Если клик был по кнопке закрытия — закрываем вкладку и выходим
    if ((e.target as HTMLElement).closest(`.${cls.tab__close}`)) {
      onClose();
      return;
    }
    // Если таймер не истек, это клик
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!isDragging) {
      onClick(); // Если не было перетаскивания, считаем это кликом
    }

    setIsDragging(false); // Сбрасываем флаг перетаскивания
  };

  return (
    <button
      {...props}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className={clsx(
        cls.tab,
        { [cls.tab_active]: active },
      )}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {title}
      <button
        className={cls.tab__close}
      >
        <IoMdClose size={15} />
      </button>
    </button>
  );
};