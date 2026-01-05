import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function Skills() {
  const skillCategories = [
    {
      title: 'フロントエンド',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Vue.js', level: 75 },
      ],
    },
    {
      title: 'バックエンド',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 80 },
        { name: 'GraphQL', level: 75 },
        { name: 'REST API', level: 90 },
      ],
    },
    {
      title: 'データベース',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 78 },
        { name: 'Redis', level: 70 },
        { name: 'Prisma', level: 82 },
      ],
    },
    {
      title: 'インフラ・ツール',
      skills: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'Git', level: 95 },
        { name: 'CI/CD', level: 78 },
      ],
    },
  ];

  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
    'MongoDB', 'AWS', 'Docker', 'Git', 'Figma', 'Tailwind CSS',
    'GraphQL', 'Prisma', 'Jest', 'Cypress', 'Vercel', 'Supabase',
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">スキル・技術スタック</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            これまでの経験で習得した技術と継続的に学習している分野
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>使用技術・ツール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}