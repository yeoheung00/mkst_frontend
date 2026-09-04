import SidebarProvider from "./SidebarProvider";
import ThemeProvider from "./ThemeProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  )
}
