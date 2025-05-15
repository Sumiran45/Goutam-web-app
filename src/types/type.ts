type MarkedDatesType = {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    selectedColor?: string;
    dotColor?: string;
    activeOpacity?: number;
  };
};

export const periodDays: MarkedDatesType = {
  '2025-04-10': { selected: true, marked: true, selectedColor: '#3498db' },
  '2025-04-11': { selected: true, marked: true, selectedColor: '#3498db' },
  '2025-04-12': { selected: true, marked: true, selectedColor: '#3498db' },
  '2025-04-13': { selected: true, marked: true, selectedColor: '#3498db' },
  '2025-04-14': { selected: true, marked: true, selectedColor: '#3498db' },
  '2025-04-15': { selected: true, marked: true, selectedColor: '#3498db' },
  '2025-04-29': { marked: true, dotColor: '#50cebb', activeOpacity: 0, selectedColor: '#50cebb' },
};


export const dailyTips = {
  "Today you will likely experience symptoms like:": [
    { text: "Heavy flow", icon: "🩸" },
    { text: "Low energy", icon: "🔋" },
    { text: "Stomach cramps", icon: "⚡" },
  ]
};

export const recommendedExercises = [
  {
    title: "Forward bending poses can ease menstrual pain",
    image: require('../../assets/images/bear.png')
  },
  {
    title: "Child's pose can reduce back pain from cramping",
    image: require('../../assets/images/bear.png')
  }
];

export interface StatBoxProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface ActivityItemProps {
  text: string;
  time: string;
  icon?: string;
}

export interface NavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export interface FilterButtonProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const mockArticles = [
  {
    id: '1',
    title: 'Understanding Your First Period: What Every Girl Should Know',
    content: `Your first period, also known as menarche, is a significant milestone in your journey to womanhood. It typically occurs between ages 9-16, with the average being around 12 years old.

When your first period arrives, you might notice a brownish or reddish stain in your underwear. The flow might be light at first and may last anywhere from 2-7 days. During this time, you can use pads, which are often recommended for beginners.

It's normal to experience some cramping, mood changes, and fatigue during your period. Keeping a period tracker can help you understand your cycle better. Remember that every girl's body is different, and periods can be irregular in the first couple of years.

If you have questions or concerns, don't hesitate to talk to a trusted adult, school nurse, or healthcare provider. They can provide guidance and reassurance during this important transition.`,
    author: 'Dr. Sarah Wilson',
    authorId: 'user1',
    date: '2025-05-10T10:30:00',
    likes: 45,
    comments: 12,
  },
  {
    id: '2',
    title: 'Managing Period Pain: Natural Remedies and Self-Care Tips',
    content: `Period pain or menstrual cramps (dysmenorrhea) is a common experience for many girls and women. The discomfort is caused by your uterus contracting to help shed its lining.

While mild to moderate cramping is normal, there are several ways to find relief:
- Apply a heating pad or hot water bottle to your lower abdomen
- Take a warm bath to relax your muscles
- Stay hydrated and avoid caffeine and salty foods
- Try gentle yoga poses like child's pose or cat-cow stretch
- Practice deep breathing or meditation techniques
- Take over-the-counter pain relievers like ibuprofen if necessary

Regular exercise throughout the month can also help reduce the severity of cramps when your period arrives. Getting adequate sleep and managing stress are important aspects of period care as well.

If your pain is severe enough to interfere with daily activities or school, it's important to talk to a healthcare provider. They can rule out underlying conditions and suggest additional treatment options.`,
    author: 'Emma Chen',
    authorId: 'user2',
    date: '2025-05-05T14:15:00',
    likes: 78,
    comments: 23,
  },
  {
    id: '3',
    title: 'Period Products Explained: Finding What Works Best for You',
    content: `When it comes to managing your period, there are several product options available. Understanding the pros and cons of each can help you find what works best for your body and lifestyle.

Disposable Pads:
- Easy to use and widely available
- Good for beginners or overnight use
- Come in various sizes for different flow levels
- Need to be changed every 4-6 hours

Tampons:
- Allow for more freedom of movement
- Can't be felt when inserted correctly
- Can be used for swimming
- Should be changed every 4-8 hours
- Not recommended for overnight use

Menstrual Cups:
- Reusable and eco-friendly
- Can be worn for up to 12 hours
- More cost-effective in the long run
- May take practice to insert correctly

Period Underwear:
- Looks and feels like regular underwear
- Good backup option or for light days
- Washable and reusable
- Available in many styles and absorbency levels

Remember, it might take time to figure out what products work best for you, and your preferences might change over time. Many people use different products during different parts of their cycle or for different activities.`,
    author: 'Lisa Johnson',
    authorId: 'user3',
    date: '2025-04-28T09:45:00',
    likes: 120,
    comments: 34,
  },
  {
    id: '5',
    title: 'Nutrition and Your Period: Foods That Help Balance Hormones',
    content: `What you eat can have a significant impact on how you feel during your period. Certain foods can help balance hormones, reduce inflammation, and ease common period symptoms.

Foods that may help during your period:
- Iron-rich foods (leafy greens, beans, lean meats) to replace iron lost through bleeding
- Omega-3 fatty acids (fatty fish, walnuts, flaxseeds) to reduce inflammation and cramps
- Calcium-rich foods (yogurt, almonds, fortified plant milks) to combat mood swings
- Magnesium-rich foods (dark chocolate, bananas, avocados) to ease cramps and headaches
- Water and hydrating fruits to reduce bloating

Foods that might worsen symptoms:
- High-sodium foods that can increase bloating
- Caffeine, which may worsen anxiety and breast tenderness
- Alcohol, which can disrupt hormone balance
- Sugary foods that can cause energy crashes

Eating smaller, more frequent meals might help if you experience nausea or digestive issues during your period. Some people find that eating warm foods and drinking herbal teas like ginger, chamomile, or peppermint provides comfort and relief.

Remember that everyone's body responds differently to foods, so pay attention to how various foods affect your symptoms and adjust your diet accordingly.`,
    author: 'Olivia Brown',
    authorId: 'user5',
    date: '2025-04-15T11:10:00',
    likes: 67,
    comments: 8,
  },
  {
    id: '6',
    title: 'Talking About Periods: Breaking the Stigma',
    content: `Despite affecting half the world's population, periods have historically been surrounded by shame, myths, and stigma. Breaking this stigma is essential for health education, gender equality, and individual well-being.

Ways we can help break the period stigma:
- Use direct language instead of euphemisms ("period" instead of "time of the month")
- Share experiences and normalize period discussions
- Include all genders in period education
- Challenge harmful myths and misinformation
- Support access to period products for all

It's important to remember that periods are a natural biological process, not something shameful or dirty. In many cultures around the world, there's a growing movement to celebrate menarche (first period) as an important milestone rather than something to hide.

By speaking openly about periods, we can ensure that the next generation of young people grows up with accurate information, support, and confidence about their bodies. This openness helps everyone make informed healthcare decisions and reduces the isolation that many feel around menstruation.

If you're uncomfortable talking about periods, start small. Perhaps discuss with close friends or family members before broadening the conversation. Remember that your comfort level is valid, and change happens gradually.`,
    author: 'Zoe Martinez',
    authorId: 'user6',
    date: '2025-04-10T13:40:00',
    likes: 93,
    comments: 27,
  },
  {
    id: '7',
    title: 'Period Myths Debunked: Separating Fact from Fiction',
    content: `There are many myths and misconceptions about periods that can cause unnecessary worry or shame. Let's clear up some of the most common ones:

MYTH: You shouldn't exercise during your period.
FACT: Exercise can actually help relieve cramps and boost your mood through endorphin release. Choose activities that feel good to you.

MYTH: You can't get pregnant during your period.
FACT: While less likely, pregnancy can occur during menstruation, especially in people with shorter cycles or longer periods.

MYTH: Using tampons means you're no longer a virgin.
FACT: Virginity is not determined by tampon use. Tampons can be used by anyone who menstruates, regardless of sexual activity.

MYTH: PMS is just in your head.
FACT: Premenstrual syndrome involves real physical and emotional symptoms caused by hormone fluctuations.

MYTH: Period blood is unclean.
FACT: Menstrual blood is just a combination of blood and tissue that the body no longer needs. It's not dirty or harmful.

MYTH: Everyone's cycle is 28 days with periods lasting 7 days.
FACT: Cycle and period length vary widely. A "normal" cycle can range from 21-35 days, and periods typically last 2-7 days.

MYTH: Having your first period means you're ready for pregnancy.
FACT: First periods often occur before the body is physically or emotionally mature enough for pregnancy.

Education and open discussion are the best ways to combat these persistent myths. When we understand the facts about our bodies, we can make better health decisions and feel more confident.`,
    author: 'Dr. Rachel Kim',
    authorId: 'user7',
    date: '2025-04-05T10:05:00',
    likes: 105,
    comments: 41,
  },
  {
    id: '8',
    title: 'When to See a Doctor: Understanding Period Problems',
    content: `While variation in periods is normal, certain symptoms may indicate it's time to consult a healthcare provider. Being aware of these signs can help you advocate for your health.

Consider seeing a doctor if you experience:
- Extremely heavy bleeding (soaking through a pad/tampon every hour for several hours)
- Periods that last longer than 7 days
- Severe pain that interferes with daily activities and doesn't improve with over-the-counter pain relievers
- Periods that stop for 90+ days (if you've had regular periods previously)
- Bleeding between periods
- Sudden changes in your cycle
- Severe PMS symptoms that affect your quality of life

Conditions that might cause abnormal periods include:
- Polycystic Ovary Syndrome (PCOS)
- Endometriosis
- Pelvic Inflammatory Disease
- Uterine fibroids
- Thyroid disorders
- Bleeding disorders

When seeking medical care, it helps to track your cycles and symptoms. Note the dates, flow heaviness, pain levels, and any other symptoms you experience. This information can be valuable for your healthcare provider in determining what might be happening.

Remember that period experiences exist on a spectrum, and what's "normal" varies from person to person. However, pain and symptoms that significantly impact your life deserve medical attention and care.`,
    author: 'Dr. Jamie Taylor',
    authorId: 'user8',
    date: '2025-04-01T15:30:00',
    likes: 72,
    comments: 19,
  }
];