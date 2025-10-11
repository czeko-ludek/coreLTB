import React from 'react';
import { SectionHeader, SectionHeaderProps, TeamMemberCard, TeamMemberCardProps } from '@/components/shared';

export interface TeamSectionProps {
  header: SectionHeaderProps;
  team: TeamMemberCardProps[];
}

export function TeamSection({ header, team }: TeamSectionProps) {
  return (
    <section className="section-with-bg py-20">
      <div className="container mx-auto px-4">
        <SectionHeader {...header} align="center" theme="light" />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

