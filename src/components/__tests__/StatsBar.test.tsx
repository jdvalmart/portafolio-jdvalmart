import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsBar } from '../StatsBar'
import type { Stat } from '../StatsBar'

describe('StatsBar', () => {
  const mockStats: Stat[] = [
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'AI Projects', value: 4 },
    { label: 'ML Labs', value: 20, suffix: '+' },
    { label: 'Bootcamp IA', value: 20, suffix: ' weeks' },
  ]

  it('renders the correct number of stat badges', () => {
    render(<StatsBar stats={mockStats} />)
    // Each stat is rendered inside a flex-wrap container with min-w-[140px] cards
    const badges = screen.getAllByText(/Years Experience|AI Projects|ML Labs|Bootcamp IA/)
    expect(badges).toHaveLength(4)
  })

  it('renders correct labels for all stats', () => {
    render(<StatsBar stats={mockStats} />)
    expect(screen.getByText('Years Experience')).toBeInTheDocument()
    expect(screen.getByText('AI Projects')).toBeInTheDocument()
    expect(screen.getByText('ML Labs')).toBeInTheDocument()
    expect(screen.getByText('Bootcamp IA')).toBeInTheDocument()
  })

  it('renders all four stat cards in the DOM', () => {
    render(<StatsBar stats={mockStats} />)
    // Verify all 4 stat labels are present
    const yearLabel = screen.getByText('Years Experience')
    const projectsLabel = screen.getByText('AI Projects')
    const labsLabel = screen.getByText('ML Labs')
    const bootcampLabel = screen.getByText('Bootcamp IA')
    expect(yearLabel).toBeInTheDocument()
    expect(projectsLabel).toBeInTheDocument()
    expect(labsLabel).toBeInTheDocument()
    expect(bootcampLabel).toBeInTheDocument()
    // Verify 4 individual stat cards via their labels' parent containers
    const cards = [yearLabel, projectsLabel, labsLabel, bootcampLabel]
      .map((label) => label.closest('[class*="flex flex-col items-center"]'))
      .filter(Boolean)
    expect(cards).toHaveLength(4)
  })
})
