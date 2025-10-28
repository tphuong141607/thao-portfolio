import { CraftManageDashboard } from '@/features/craft/components/CraftManageDashboard'
import { fetchCraftCaseStudies, fetchCraftProjects } from '@/features/craft/lib/server'

export default async function CraftManagePage() {
  const [projects, caseStudies] = await Promise.all([fetchCraftProjects(), fetchCraftCaseStudies()])

  return <CraftManageDashboard initialProjects={projects} initialCaseStudies={caseStudies} />
}
