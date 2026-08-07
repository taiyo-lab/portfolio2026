import React from "react";
import { Card, CardContent } from "./ui/card";
import { SectionHeading } from "./ui/SectionHeading";
import { Flame } from "lucide-react";

const saunas = ["しきじ", "天光の湯", "竜泉寺の湯茅ヶ崎"];

export function FavoriteSaunas() {
  return (
    <section id="favorite-sauna" className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="好きなサウナ" />
        <div className="grid sm:grid-cols-3 gap-6">
          {saunas.map((name) => (
            <Card key={name}>
              <CardContent className="p-6 flex items-center gap-3">
                <Flame className="w-5 h-5 text-primary shrink-0" />
                <span className="text-lg">{name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
