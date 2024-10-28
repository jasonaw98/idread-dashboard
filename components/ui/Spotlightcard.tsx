'use client'
import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardData {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

interface SpotlightCardProps {
  cards: CardData[];
  className?: string;
}

const SpotlightItem: React.FC<CardData> = ({ title, description, icon, className }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => controls.start({ opacity: 1 });
  const handleMouseLeave = () => controls.start({ opacity: 0 });

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(`relative w-80 rounded-3xl border border-neutral-200 bg-neutral-100 p-12` , className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl "
        animate={controls}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(242, 243, 244,.25), transparent 40%)`,
        }}
      />
      <h3 className="mb-2 font-semibold text-neutral-800">
        {title}
      </h3>
      <div className="mb-4 flex justify-center w-full">
        {icon}
      </div>
      <p className="text-sm text-neutral-800">
        {description}
      </p>
    </div>
  );
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ cards }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {cards.map((card, index) => (
        <SpotlightItem
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          className={card.className}
        />
      ))}
    </div>
  );
};

export default SpotlightCard;
