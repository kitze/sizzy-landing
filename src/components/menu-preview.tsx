import React from "react";
import { BottomDrawerMenu } from "./BottomDrawerMenu";
import { CommonMenuItem } from "@/components/CommonMenuItem";
import { CommonMenuLabel } from "@/components/CommonMenuLabel";
import { CommonMenuSeparator } from "@/components/CommonMenuSeparator";
import { CommonMenuGroup } from "@/components/CommonMenuGroup";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  Bell,
  Bookmark,
  Share,
  HelpCircle,
  FileText,
  Download,
  Info,
  Mail,
} from "lucide-react";

export default function BottomDrawerMenuPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <BottomDrawerMenu
          title="Account Menu"
          content={
            <>
              <CommonMenuLabel>My Account</CommonMenuLabel>
              <CommonMenuSeparator />
              <CommonMenuItem leftIcon={User}>Profile</CommonMenuItem>
              <CommonMenuItem
                leftIcon={Settings}
                hint="Configure your account settings including notifications, privacy, and security"
              >
                Settings
              </CommonMenuItem>
              <CommonMenuItem
                leftIcon={Bell}
                hint="Manage your notification preferences"
              >
                Notifications
              </CommonMenuItem>
              <CommonMenuItem leftIcon={Mail}>Messages</CommonMenuItem>
              <CommonMenuSeparator />
              <CommonMenuItem leftIcon={LogOut} destructive isLast>
                Log out
              </CommonMenuItem>
            </>
          }
        >
          <Button variant="outline" size="sm" className="w-36">
            Account Menu
          </Button>
        </BottomDrawerMenu>
      </div>

      <div className="text-sm text-center text-muted-foreground pb-2 max-w-xs mx-auto">
        Click the buttons to open the bottom drawer menus with help icons
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <BottomDrawerMenu
          title="Document Actions"
          content={
            <>
              <CommonMenuItem leftIcon={FileText}>Open File</CommonMenuItem>
              <CommonMenuItem
                leftIcon={Bookmark}
                hint="Save this document for later access"
              >
                Bookmark
              </CommonMenuItem>
              <CommonMenuItem leftIcon={Download}>Download</CommonMenuItem>
              <CommonMenuItem
                leftIcon={Share}
                hint="Share with team members or external contacts"
              >
                Share
              </CommonMenuItem>
              <CommonMenuSeparator />
              <CommonMenuItem
                leftIcon={Info}
                hint="View detailed document information including creation date, size, and author"
              >
                Info
              </CommonMenuItem>
              <CommonMenuItem
                leftIcon={HelpCircle}
                hint="Get help using this document or contact support"
                isLast
              >
                Help
              </CommonMenuItem>
            </>
          }
        >
          <Button variant="secondary" size="sm">
            Document Actions
          </Button>
        </BottomDrawerMenu>
      </div>
    </div>
  );
}
