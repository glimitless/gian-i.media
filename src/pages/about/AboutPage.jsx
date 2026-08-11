import { PageShell } from "../../util/page-layout/PageShell";
import { AysncContent } from "../../util/page-layout/AsyncContent";
import { AboutPageBody } from "./AboutPageBody";

export function AboutPage({ sidebarProps, headerProps, filteredNavItems, }) {
  return (
    <PageShell sidebarProps={sidebarProps} headerProps={headerProps}>
      <AysncContent>
        <AboutPageBody filteredNavItems={filteredNavItems} />
      </AysncContent>
    </PageShell>
  )
}