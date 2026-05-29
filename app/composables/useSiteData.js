export const useSiteData = () => {
  const workItems = [
    { name: 'Sinth', type: 'Developer tool — HTML, but sooo easy.', status: 'Live' },
    { name: 'Niquitia', type: 'Game — In development', status: 'WIP' },
    { name: 'The Projects Saga', type: 'Film series — YouTube playlist', status: 'Ongoing' }
  ]

  const filmItems = [
    { title: 'The Projects Saga', meta: 'Playlist · Ongoing', url: 'https://www.youtube.com/watch?v=SDsw1m5_pWQ&list=PLXEG7VI6VCKWJDKdB7kc8WaSloREbPLvI' },
    { title: 'Episode I', meta: 'Entry 01', url: 'https://www.youtube.com/watch?v=SDsw1m5_pWQ' },
    { title: 'Full playlist →', meta: '', url: 'https://www.youtube.com/watch?v=SDsw1m5_pWQ&list=PLXEG7VI6VCKWJDKdB7kc8WaSloREbPLvI' }
  ]

  const moreItems = [
    { label: 'Gaming', title: 'Niquitia', body: "A game currently in development. More when it's ready." },
    { label: 'Tooling', title: 'Open source', body: 'Sinth is just the start. More developer tools are coming.' },
    { label: 'Coming', title: 'Watch this space', body: 'New experiments, projects, surprises. Always.' }
  ]

  return { workItems, filmItems, moreItems }
}