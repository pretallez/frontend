"use client";
import { RootState } from "@/redux/store";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { toggle } from "@/redux/slices/sheet-slice";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

export default function CommonSheet() {
  const isOpen = useAppSelector((state: RootState) => state.sheet.isOpen);
  const dispatch = useAppDispatch();

  function onOpenChange() {
    dispatch(toggle());
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        onOpenChange();
      }}
    >
      <SheetContent>
        <div className="flex gap-[16px] items-center my-5 px-2">
          <div>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/woman-wearing-fencing-mask-portrait-stasker.jpg"
                alt="avatar"
              />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <SheetTitle className="text-sm font-medium leading-none">
              Nickname
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              description
            </SheetDescription>
          </div>
        </div>
        <Command>
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem disabled>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </SheetContent>
    </Sheet>
  );
}
