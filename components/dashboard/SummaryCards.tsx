"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Headphones, CreditCard } from "lucide-react";

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Unread Transcripts Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unread Transcripts</CardTitle>
          <Headphones className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            +3 from yesterday
          </p>
        </CardContent>
      </Card>

      {/* Next Transcript ETA Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Transcript</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2h 15m</div>
          <p className="text-xs text-muted-foreground">
            Morning briefing scheduled
          </p>
        </CardContent>
      </Card>

      {/* Usage Plan Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">47/100</div>
          <Progress value={47} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            53 transcripts remaining
          </p>
        </CardContent>
      </Card>
    </div>
  );
}