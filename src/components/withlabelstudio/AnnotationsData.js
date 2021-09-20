module.exports.RESPONSE_DATA = [
    {
        NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
        NER_labels: [
            { end: 75, entity: "General Satisfaction", start: 0 },
        ],
        annotation: {
            type: "image rectangle",
            entities: []
        },
        documentSecondary: "",
        // document: "https://htx-misc.s3.amazonaws.com/opensource/label-studio/examples/images/nick-owuor-astro-nic-visuals-wDifg5xc9Z4-unsplash.jpg",
        document: "http://localhost:3002/table.png",
        id: "60ca1215665765fad5dd5f68",
        comments: [
            { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
        ]
    },
    {
        NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Awesome, very helpful\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n, \n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Dr was very thorough with questions and very attentive.\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">Doctor Proficiency</span>\n</mark>\n \n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    I feel hopeful I will get some answers now for my pain.\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n</div></div>",
        NER_labels: [
            { end: 21, entity: "General Satisfaction", start: 0 },
            { end: 78, entity: "Doctor Proficiency", start: 23 },
            { end: 134, entity: "General Satisfaction", start: 79 },
        ],
        annotation: {
            type: "text",
            entities: [
                { end: 21, label: "General Satisfaction", start: 0, text: "Awesome, very helpful" },
                { end: 78, label: "Doctor Proficiency", start: 23, text: "Dr was very thorough with questions and very attentive." },
                // { end: 134, label: "General Satisfaction", start: 79, text: "I feel hopeful I will get some answers now for my pain." },
                // { direction: "right", from_id: "001", to_id: "101", type: "relation" }
            ]
        },
        documentSecondary: "",
        document: "Awesome, very helpful, Dr was very thorough with questions and very attentive. I feel hopeful I will get some answers now for my pain.",
        id: "60c9f255665765fad5dd5eed",
        comments: [
            { id: "", commentedBy: "Admin", comment: "please tag the review again", commentedAt: "1 hour ago" },
            { id: "", commentedBy: "Admin", comment: "please tag the review again", commentedAt: "2 hours ago" },
        ]
    },

    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "image polygon",
    //         entities: []
    //     },
    //     documentSecondary: "",
    //     document: "https://imgflip.com/s/meme/Leonardo-Dicaprio-Cheers.jpg",
    //     id: "60ca02bb665765fad5dd5f33",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "video",
    //         entities: []
    //     },
    //     documentSecondary: "<video src='https://app.heartex.ai/static/samples/opossum_snow.mp4' width=100% muted /><img src onerror=\"$=n=>document.getElementsByTagName(n)[0];a=$('audio');v=$('video');a.onseeked=()=>{v.currentTime=a.currentTime};a.onplay=()=>v.play();a.onpause=()=>v.pause()\" />",
    //     document: "https://app.heartex.ai/static/samples/opossum_snow.mp4",
    //     id: "60c9ef9c665765fad5dd5ee4",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "audio",
    //         entities: []
    //     },
    //     documentSecondary: "",
    //     document: "https://app.heartex.ai/static/samples/game.wav",
    //     id: "60c9f0f3665765fad5dd5ee7",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "pairwise",
    //         entities: []
    //     },
    //     documentSecondary: "To have faith is to trust yourself to the water",
    //     document: "To have faith is to trust yourself to the water",
    //     id: "60c9f0f3665765fad5dd5ee7",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "keypoints",
    //         entities: []
    //     },
    //     documentSecondary: "",
    //     document: "https://htx-misc.s3.amazonaws.com/opensource/label-studio/examples/images/nick-owuor-astro-nic-visuals-wDifg5xc9Z4-unsplash.jpg",
    //     id: "60c9f0f3665765fad5dd5ee7",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "HTML NER",
    //         entities: []
    //     },
    //     documentSecondary: "",
    //     document: "<div style=\"max-width: 750px\"><div style=\"clear: both\"><div style=\"float: right; display: inline-block; border: 1px solid #F2F3F4; background-color: #F8F9F9; border-radius: 5px; padding: 7px; margin: 10px 0;\"><p><b>Jules</b>: No no, Mr. Wolfe, it's not like that. Your help is definitely appreciated.</p></div></div><div style=\"clear: both\"><div style=\"float: right; display: inline-block; border: 1px solid #F2F3F4; background-color: #F8F9F9; border-radius: 5px; padding: 7px; margin: 10px 0;\"><p><b>Vincent</b>: Look, Mr. Wolfe, I respect you. I just don't like people barking orders at me, that's all.</p></div></div><div style=\"clear: both\"><div style=\"display: inline-block; border: 1px solid #D5F5E3; background-color: #EAFAF1; border-radius: 5px; padding: 7px; margin: 10px 0;\"><p><b>The Wolf</b>: If I'm curt with you, it's because time is a factor. I think fast, I talk fast, and I need you two guys to act fast if you want to get out of this. So pretty please, with sugar on top, clean the car.</p></div></div></div>",
    //     id: "60c9f0f3665765fad5dd5ee7",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "audio classification",
    //         entities: []
    //     },
    //     documentSecondary: "",
    //     document: "https://app.heartex.ai/static/samples/game.wav",
    //     id: "60c9f0f3665765fad5dd5ee7",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
    // {
    //     NER_html: "<div style=\"overflow-x: auto; border: 1px solid #E6E9EF; border-radius: 0.25rem; padding: 1rem\"><div class=\"entities\" style=\"line-height: 2.5; direction: ltr\">\n<mark class=\"entity\" style=\"background: #ddd; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;\">\n    Simply the best I am willing to do a commercial 😊 for u guys 2 thumb's up !\n    <span style=\"font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem\">General Satisfaction</span>\n</mark>\n!</div></div>",
    //     NER_labels: [
    //         { end: 75, entity: "General Satisfaction", start: 0 },
    //     ],
    //     annotation: {
    //         type: "text classification",
    //         entities: []
    //     },
    //     documentSecondary: "",
    //     document: "To have faith is to trust yourself to the water",
    //     id: "60c9f0f3665765fad5dd5ee7",
    //     comments: [
    //         { id: "", commentedBy: "", comment: "comment for simply the best", commentedAt: "" }
    //     ]
    // },
]
