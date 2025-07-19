"use client";

import { Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockActivity = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    source: "AI Weekly",
    timestamp: "2 hours ago",
    isNew: true,
  },
  {
    id: 2,
    title: "Market Analysis: Tech Stocks",
    source: "Financial Times",
    timestamp: "4 hours ago",
    isNew: true,
  },
  {
    id: 3,
    title: "Product Launch Roundup",
    source: "Product Hunt",
    timestamp: "6 hours ago",
    isNew: false,
  },
  {
    id: 4,
    title: "Climate Tech Innovations",
    source: "Green Tech",
    timestamp: "8 hours ago",
    isNew: false,
  },
  {
    id: 5,
    title: "Startup Funding News",
    source: "TechCrunch",
    timestamp: "12 hours ago",
    isNew: false,
  },
];

export function RecentActivityList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Volume2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    {item.isNew && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{item.source} • {item.timestamp}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}