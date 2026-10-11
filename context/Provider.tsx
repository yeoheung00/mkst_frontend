import { AuthProvider } from "./AuthContext";
import SidebarProvider from "./SidebarProvider";
import ThemeProvider from "./ThemeProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider >
    </AuthProvider >
  )
}
