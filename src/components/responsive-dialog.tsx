"use client"
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "./ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveDialogProps {
    title: string;
    description: string;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void

}

export const ResponsiveDialog =({
    title,
    description,
    children,
    open,
    onOpenChange,
}: ResponsiveDialogProps) => {
    const isMobile = useIsMobile();
if (isMobile) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[90vh] overflow-y-auto">
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
}
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                
                    {children}
                
            </DialogContent>
        </Dialog>
    );
};

