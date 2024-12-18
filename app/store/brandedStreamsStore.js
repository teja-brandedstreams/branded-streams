import { create } from 'zustand';

const brandedStreamsStore = create((set) => ({
    cardsData: [
        {
            title: "Available Now Hurry up!!",
            description: "How to update your script to make it ready for product placement opportunities",
            linkText: "Read More for more details",
            linkURL: "/dashboard"
        },
        {
            title: "Coming Soon",
            description: "Generate Pitch Deck for your script.",
            linkText: "Learn More",
            linkURL: "/dashboard"
        }
    ],
    noData: [
        {
            title: "Scripts",
            description: "Sorry, you do not have any scripts uploaded.",
            actionText: "Click to go to scripts page",
            actionURL: "/dashboard/scripts"
        }
    ],
    userData: {
        firstName: '',
        lastName: ''
    },
    scripts: [
        {
            name: "The past life",
            report: "PPO Report Generated",
            actions: [
                {
                    name: "View",
                    href: "/dashboard/scripts/thepastlife/ppo"
                },
                {
                    name: "Re-upload",
                    href: "/dashboard/scripts/thepastlife/view"
                },
                {
                    name: "Delete",
                    href: "/dashboard/scripts/thepastlife/view"
                }
            ]
        },
        {
            name: "The past life",
            report: "Script Score Generated",
            actions: [
                {
                    name: "View",
                    href: "/dashboard/scripts/thepastlife/score"
                },
                {
                    name: "Re-upload",
                    href: "/dashboard/scripts/thepastlife/view"
                },
                {
                    name: "Delete",
                    href: "/dashboard/scripts/thepastlife/view"
                }
            ]
        }
    ],
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    setData: (newDetails) => set({ userData: newDetails })
}));

export default brandedStreamsStore;