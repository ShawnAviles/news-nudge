"use client";

import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function QuickActions() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsletterUrl, setNewsletterUrl] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleAddNewsletter = () => {
    // Handle newsletter addition
    console.log("Adding newsletter:", newsletterUrl);
    setNewsletterUrl("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Add Newsletter Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Newsletter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Newsletter</DialogTitle>
                <DialogDescription>
                  Subscribe to a new newsletter by entering its RSS feed URL or email subscription.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="newsletter-url">Newsletter URL or RSS Feed</Label>
                  <Input
                    id="newsletter-url"
                    placeholder="https://example.com/newsletter"
                    value={newsletterUrl}
                    onChange={(e) => setNewsletterUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleAddNewsletter}>Add Newsletter</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Refresh Feed Button */}
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Feeds'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}