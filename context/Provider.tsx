import { AuthProvider } from "./AuthContext";
import { SidebarProvider } from "./SidebarContext";
import { ThemeProvider } from "next-themes";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute='class' defaultTheme='system'>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider >
    </AuthProvider >
  )
}
