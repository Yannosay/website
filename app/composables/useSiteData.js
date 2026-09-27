export const useSiteData = () => {
  const workItems = [
    { name: 'Sinth', type: 'Reactive Language', status: 'Live' },
    { name: 'Niquitia', type: 'Game in development', status: 'WIP' }
  ]

  const moreItems = [
    { label: 'Gaming', title: 'Niquitia', body: "A game currently in development. More when it's ready." },
    { label: 'Tooling', title: 'Open source', body: 'Sinth is just the start. More developer tools are coming.' },
    { label: 'Coming', title: 'Watch this space', body: 'New experiments, projects, surprises. Stay tuned!' }
  ]

  return { workItems, moreItems }
}
