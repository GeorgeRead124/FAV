/**
 * ============================================================
 *  EVERYTHING PERSONAL LIVES IN THIS ONE FILE. Edit freely.
 *  Paths are relative to /public (so "assets/images/photo-1.jpg"
 *  means public/assets/images/photo-1.jpg).
 *  Photos: if the .jpg is missing, the matching .svg placeholder
 *  is shown with a visible "Placeholder" badge.
 * ============================================================
 */
export const config = {
  herName: 'Marnona',
  himName: 'Your name', // EDIT ME
  title: 'You Are My Favorite Universe',
  heading: 'You are my favorite universe.',
  subtitle: 'A little world, made just for you.',
  startLabel: 'Enter our universe ✨',
  welcome: 'Welcome back to the sky, Marnona. Take your time. Nothing here is a test.',

  song: {
    file: 'assets/audio/our-song.mp3', // PUT YOUR LICENSED MP3 HERE
    fallback: 'assets/audio/silent.wav', // used only until the real file exists
    title: 'Our Song', // EDIT ME
    artist: 'Artist name', // EDIT ME
    art: 'assets/images/album-cover.jpg', // album-cover.svg placeholder until replaced
    message:
      'EDIT ME: Tell her why this song reminds you of her: where you first heard it, the line that sounds like her, the moment it became yours.',
  },

  // Six slots. Add more objects to the array for more memories.
  photos: [
    { src: 'assets/images/photo-1.jpg', caption: 'Memory one: edit me', date: 'Date goes here', story: 'EDIT ME: What happened here, and why it matters to you.' },
    { src: 'assets/images/photo-2.jpg', caption: 'Memory two: edit me', date: 'Date goes here', story: 'EDIT ME: Tell the story behind this photo.' },
    { src: 'assets/images/photo-3.jpg', caption: 'Memory three: edit me', date: 'Date goes here', story: 'EDIT ME: Tell the story behind this photo.' },
    { src: 'assets/images/photo-4.jpg', caption: 'Memory four: edit me', date: 'Date goes here', story: 'EDIT ME: Tell the story behind this photo.' },
    { src: 'assets/images/photo-5.jpg', caption: 'Memory five: edit me', date: 'Date goes here', story: 'EDIT ME: Tell the story behind this photo.' },
    { src: 'assets/images/photo-6.jpg', caption: 'Memory six: edit me', date: 'Date goes here', story: 'EDIT ME: Tell the story behind this photo.' },
  ],
  starMemory: 0, // index in photos[] revealed by "A memory behind the stars"

  // Exactly 20 reasons (the heart is drawn from 20 stars)
  reasons: [
    'Your smile can change my entire day.',
    'You make ordinary moments special.',
    'I love how we can be silly together.',
    'You make me laugh like nobody else does.',
    'I admire the woman you are.',
    'You are the person I imagine beside me in every future I picture.',
    'You are my comfort, even on the hardest days.',
    'I love your little habits more than I can explain.',
    'You turn a small moment into a home.',
    'You are my favorite person to talk to.',
    'I trust you with my heart.',
    'Your heart is kind, and I see it every day.',
    'You deserve patience, gentleness and respect, and I want to be the one who gives them.',
    'I want to understand you, even when we disagree.',
    'You are not difficult to love. Not even a little.',
    'You are uniquely, wonderfully you.',
    'You make our dreams feel closer.',
    'I love you in the small moments and in the big ones.',
    'I am proud of the way you keep going.',
    'Out of everyone in this world, my heart keeps choosing you.',
  ],

  games: {
    catch: {
      seconds: 30,
      unlockScore: 12,
      message: 'EDIT ME: You caught every one of them. Just like you caught me.',
    },
    // photo = index in photos[]; answer = index in options (0-2)
    guess: [
      { photo: 0, question: 'Where was this photo taken?', options: ['Option A (edit me)', 'Option B (edit me)', 'Option C (edit me)'], answer: 0 },
      { photo: 1, question: 'What were we doing here?', options: ['Option A (edit me)', 'Option B (edit me)', 'Option C (edit me)'], answer: 1 },
      { photo: 2, question: 'What did I say right after this photo?', options: ['Option A (edit me)', 'Option B (edit me)', 'Option C (edit me)'], answer: 2 },
    ],
    // x / y are percentages of the scrollable scene
    hidden: [
      { x: 12, y: 30, label: 'A faint spark near the first planet', message: 'EDIT ME: I love the way you laugh at your own jokes.' },
      { x: 38, y: 72, label: 'A glimmer low in the sky', message: 'EDIT ME: I love how you care about everyone around you.' },
      { x: 64, y: 22, label: 'A twinkle by the ringed planet', message: 'EDIT ME: I love how safe your hugs feel.' },
      { x: 88, y: 64, label: 'A shimmer at the far edge', message: 'EDIT ME: I love that you are still here, exploring this with me.' },
    ],
    hiddenFinal: 'You found every hidden heart. EDIT ME: and I would search the whole sky for you.',
  },

  letters: [
    { id: 'miss', title: 'Open when you miss me', body: ['EDIT ME.', 'Close your eyes for a second. I am thinking about you right now, probably smiling like an idiot.', 'Missing you just means that what we have is real. I will see you soon.'] },
    { id: 'hug', title: 'Open when you need a hug', body: ['EDIT ME.', 'Consider this a very long, very warm hug, with my chin on your head and nowhere to be.', 'You do not have to explain anything. I am here.'] },
    { id: 'bad', title: "Open when you're having a bad day", body: ['EDIT ME.', 'I am sorry today is heavy. It does not say anything bad about you.', 'Drink some water, breathe, and know that I am on your side. Always.'] },
    { id: 'laugh', title: 'Open when you need a laugh', body: ['EDIT ME.', 'Remember that time we could not stop laughing about something that was not even funny? Put your own inside joke here.', 'I love that we are silly together.'] },
    { id: 'mean', title: 'Open when you want to know how much you mean to me', body: ['EDIT ME.', 'You are my comfort, my favorite person, and the woman I want to build a life with.', 'If you could see yourself through my eyes for one minute, you would never doubt it again.'] },
  ],

  // The sincere apology letter, in your own words. Paragraphs are separate strings.
  finalLetter: {
    title: 'A letter about us',
    body: [
      `Hey, my darling, my Marnona ❤️`,
      `The last two days have been the hardest for me. It felt like everything was happening at once, and everything was above my head. Interviews, traveling, work, pressure, and stress were coming at me from every direction. I was more stressed than I have ever been, and honestly, I felt like I was losing control of everything around me. Even though I was trying to keep everything together, the stress started affecting me in ways I never expected.`,
      `But no matter how difficult things were for me, you never deserved to carry the weight of my stress. You never deserved to be hurt by the person who is supposed to make you feel safe, loved, and appreciated. I am truly sorry for making you stressed, for making things harder for you, and for letting my frustration affect the way I treated you. The last thing I ever wanted was to make my moon feel sad because of me. I hate knowing that someone as precious to me as you had to feel this way because of my actions.`,
      `As I always tell you, if I had only one wish in this entire world, I would choose to let you see yourself through my eyes, even if it were just for one minute. I wish you could see what I see when I look at you. You would understand that you are not just the person I was looking for, not just the girl I fell in love with, and not just someone I want to spend my life with. You are so much more than that. You are my everything, my comfort, my favorite person, the woman I want to marry, and the girl I love more than anyone else in this world.`,
      `You are the person I imagine beside me when I think about my future. You are the person I want to share my happiest moments with, but also the person I want to hold close when life becomes difficult. I want to build a life with you, make a home with you, laugh with you over the smallest things, travel with you, and grow with you through every stage of our lives. I want to be there when you need someone to listen, when you need a hug, when you need reassurance, and even when you don't know how to explain what you are feeling. I want to be the person you can always talk to without being afraid of how I will react.`,
      `And that is exactly why I feel so sorry about what happened between us.`,
      `Sometimes, when I get overwhelmed or angry, I say things I don't truly mean. My mind feels like it is fighting a battle that I don't know how to stop, and in those moments, I struggle to express what I am actually feeling. But darling, I know that being stressed doesn't make hurtful words okay. Even if I didn't mean those words, I understand that they can still hurt you, and I am sorry for the pain they caused you. You deserve better than having to wonder whether my words are what I truly feel about you.`,
      `I don't want to use stress as an excuse, and I don't want you to think that you have to accept being hurt just because I am going through a difficult time. You are my partner, not someone I should take my frustration out on. You deserve patience, kindness, respect, and love, especially during the moments when things aren't going well.`,
      `I cannot promise that life will never stress me out again, or that we will never disagree, because we are both human, and life will always have its difficult moments. But I can promise you that I will work on the way I handle those moments. I want to learn how to pause before speaking, how to explain what I feel without hurting you, and how to take a step back when my emotions become too much. I want my actions to prove that I mean this, not just my words today. I don't want us to keep hurting each other when what we really need is to understand each other.`,
      `I never want a difficult day, a stressful situation, or an argument to make you question your place in my heart. My love for you is not something that disappears when I get angry. You are still my darling when we disagree. You are still my moon when the sky gets dark. And you are still the woman I dream of marrying, even when we are going through a difficult moment.`,
      `I wish I could take away every tear, every bit of sadness, and every moment when I made you feel anything less than loved. I wish I could hug you right now, hold your hands, look into your eyes, and tell you how sorry I am. I wish I could make you feel the love I carry for you instead of leaving you to wonder about it.`,
      `My Marnona, you mean more to me than I can ever fully explain. I love your heart, your personality, your smile, your little habits, your way of making ordinary moments special, and all the little things that make you uniquely you. I love the girl who makes me laugh, the woman I admire, the person I trust with my heart, and the person I want beside me for the rest of my life. I love you in the little moments, in the big moments, in the easy days, and even through the difficult ones.`,
      `I don't expect this letter to erase what happened, and I don't expect you to stop feeling hurt just because I am telling you how much I love you. Your feelings matter to me, and I want to understand how this made you feel. Whenever you are ready, I want to listen to you, without interrupting, without defending myself, and without making you feel like your feelings are too much. I want to understand your side, because loving you also means caring about the things that hurt you.`,
      `If there is one thing I want you to remember, it is this: you are not difficult to love, you are not a burden, and you are never someone I want to lose. You are my favorite person, my future, my moon, and my Marnona. I want to keep choosing you, not only with beautiful words and romantic letters, but with the way I treat you every single day.`,
      `I love you more than I know how to put into words. I want to protect your heart, support your dreams, celebrate your happiness, stand beside you when life gets hard, and give you the kind of love that makes you feel safe being yourself. I want to keep learning how to love you better, because you deserve a love that is not only deep, but also gentle, patient, and consistent.`,
      `I am truly sorry, my moon, for letting my stress affect you and for making these days harder than they needed to be. You mean the world to me, and I never want you to forget how precious you are to me.`,
      `I love you, my darling. I love you, my moon. I love you, MARNONA! ❤️🌙`,
      `And if I could make just one wish tonight, it would still be the same wish I have always had: to let you see yourself through my eyes, so you could finally understand why, out of everyone in this world, you are the one my heart keeps choosing.`,
      `Forever yours. ❤️`,
    ],
  },

  future: [
    { id: 'date', title: 'A date night', text: 'Dinner somewhere quiet, a long walk after, and no phones.' },
    { id: 'trip', title: 'A trip somewhere beautiful', text: 'Pick a place neither of us has seen, and get a little lost together.' },
    { id: 'cook', title: 'Cooking together', text: 'A messy kitchen, our favorite music, and a recipe we ignore halfway.' },
    { id: 'sunrise', title: 'Watching the sunrise', text: 'Blankets, something warm to drink, and the whole sky changing colour.' },
    { id: 'new', title: 'Creating new memories', text: 'Whatever you want to try next. You choose.' },
  ],

  secret: {
    photo: 0, // index in photos[] shown as "our favorite photograph"
    message: 'EDIT ME: This is my favorite photograph of us, because...',
    closing:
      'No website could ever explain everything you mean to me. I just wanted to make something that reminds you that you are loved, appreciated, and important to me. Even when things are difficult, I still care about you and want to understand you better.',
  },
};
export type Config = typeof config;
