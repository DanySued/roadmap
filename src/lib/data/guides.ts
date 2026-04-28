export type GuideSection = {
  heading: string;
  body: string;
};

export type Guide = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  color: string;
  excerpt: string;
  intro: string;
  sections: GuideSection[];
  keyTakeaways: string[];
};

export const GUIDES: Guide[] = [
  {
    id: "strength-fundamentals",
    title: "Strength Training Fundamentals",
    category: "Strength",
    readTime: "6 min",
    color: "#aaa8ff",
    excerpt: "Understand progressive overload, compound vs. isolation movements, and how to structure your first program from scratch.",
    intro: "Strength training is one of the highest-leverage things you can do for your health, body composition, and longevity. But most people start wrong — either copying a pro bodybuilder's split or following a random internet program with no understanding of why. This guide gives you the foundation to train intelligently from day one.",
    sections: [
      {
        heading: "The one principle that explains everything",
        body: "Progressive overload is the core driver of all strength and muscle gains. It simply means: over time, you must demand more from your body than it currently handles. More weight, more reps, more sets, or less rest — any form of increased demand forces adaptation. Without it, your body has no reason to grow stronger. This is why writing down what you lifted last session isn't optional — it's the whole game.",
      },
      {
        heading: "Compound lifts vs. isolation movements",
        body: "Compound movements (squat, deadlift, bench press, overhead press, row) train multiple muscle groups simultaneously and produce the highest hormonal response. They should form the foundation of any program. Isolation movements (curls, lateral raises, leg extensions) target single muscles and are useful accessories but shouldn't be your main course. For beginners especially: get strong on compounds first. Everything else follows.",
      },
      {
        heading: "How to structure your first program",
        body: "For beginners, full-body training 3 days per week outperforms splits. Each workout should include one lower-body push (squat), one lower-body pull (deadlift or RDL), one upper-body push (bench or overhead press), and one upper-body pull (row or chin-up). Start light — embarrassingly light. Your first goal is learning the movements, not impressing anyone. Add weight or reps every session for as long as possible. That linear progression phase is gold — don't rush through it.",
      },
      {
        heading: "The most common beginner mistakes",
        body: "Training to failure on every set burns out your nervous system and eliminates recovery. Stop 1–2 reps short of failure on compound lifts. Program hopping (switching programs every 2–3 weeks) is the single biggest progress killer. Pick a program and run it for at least 8–12 weeks. Neglecting sleep and protein undoes your time in the gym. You build muscle during recovery, not during the workout itself.",
      },
    ],
    keyTakeaways: [
      "Progressive overload — consistently demanding more — is the only driver of strength gains.",
      "Build your program around compound lifts (squat, deadlift, bench, press, row).",
      "Full-body 3x/week beats any split for beginners. Add weight every session.",
      "Stop 1–2 reps short of failure on compounds. Save isolation work for after.",
      "Consistency over 12+ weeks beats any perfect program you run for 3 weeks.",
    ],
  },

  {
    id: "macros-explained",
    title: "Understanding Macros for Your Goal",
    category: "Nutrition",
    readTime: "8 min",
    color: "#7f9ef8",
    excerpt: "Break down protein, carbohydrates, and fats — and learn exactly how to calculate your macros for muscle building, fat loss, or performance.",
    intro: "Macronutrients — protein, carbohydrates, and fat — are the three categories that make up every calorie you eat. Understanding them isn't about obsessing over numbers; it's about knowing which levers to pull to reach your goal. Whether you want to lose fat, build muscle, or perform better, macros are the framework that makes it make sense.",
    sections: [
      {
        heading: "Protein: the non-negotiable macro",
        body: "Protein (4 calories per gram) is the primary building block for muscle tissue. It's also the most satiating macro — meaning it keeps you fuller longer and reduces overall calorie intake naturally. For anyone training regularly, aim for 0.7–1g of protein per pound of bodyweight daily. Higher protein doesn't build more muscle beyond this range, but it protects existing muscle during a deficit and supports recovery after training. Prioritize protein above all other macros. If you hit protein, the rest becomes much more flexible.",
      },
      {
        heading: "Carbohydrates: your engine fuel",
        body: "Carbohydrates (4 cal/g) are your body's preferred fuel source, especially for high-intensity exercise. They get stored as glycogen in muscle and liver, available as rapid energy during training. Timing matters: more carbs around training (before and after), fewer at rest. The low-carb movement oversimplified things — carbs are not the enemy. Cutting carbs too aggressively reduces training performance and recovery. Keep them high enough to train hard. Reduce them strategically if fat loss stalls.",
      },
      {
        heading: "Fat: hormones and micronutrients",
        body: "Dietary fat (9 cal/g) is essential for hormone production (including testosterone), absorption of fat-soluble vitamins (A, D, E, K), and cell membrane health. The floor is roughly 0.3–0.4g per lb of bodyweight — go below this and hormonal function declines. Fat does not cause fat gain; excess calories do. Focus on unsaturated fats (olive oil, avocado, nuts, fatty fish) and limit processed trans fats.",
      },
      {
        heading: "Calculating macros for your goal",
        body: "Step 1: Find your TDEE (Total Daily Energy Expenditure) — use a calculator based on your weight, height, age, and activity level. Step 2: Set your calorie target (deficit of 300–500 for fat loss, surplus of 200–300 for muscle building, maintenance for performance). Step 3: Set protein at 0.7–1g per lb. Step 4: Set fat at 0.35–0.5g per lb. Step 5: Fill remaining calories with carbohydrates. Adjust every 2 weeks based on actual results.",
      },
    ],
    keyTakeaways: [
      "Protein (0.7–1g/lb) is the most important macro to hit regardless of goal.",
      "Carbs fuel training — don't cut them too aggressively if performance matters.",
      "Fat supports hormones — never go below 0.3g/lb bodyweight.",
      "Set calories first (TDEE ± goal), then set protein, fat, then fill carbs.",
      "Adjust every 2 weeks based on real weight and measurement data.",
    ],
  },

  {
    id: "progressive-overload",
    title: "Progressive Overload: The Only Rule That Matters",
    category: "Strength",
    readTime: "5 min",
    color: "#aaa8ff",
    excerpt: "The single most important principle in training explained simply — and how to apply it to any program without burning out.",
    intro: "If you could understand only one thing about getting stronger or building muscle, it would be progressive overload. Every effective training program in history — regardless of the specific exercises, sets, or reps — works because it applies this principle. Every program that fails does so because it doesn't.",
    sections: [
      {
        heading: "What progressive overload actually means",
        body: "Your body adapts to the demands placed on it. If you lift the same weight for the same reps every session forever, your body has no reason to change — it's already adapted. Progressive overload means consistently increasing the demand on your body over time. This can mean more weight on the bar, more reps with the same weight, more sets per workout, less rest between sets, or improved technique with the same load. Any of these count. What matters is that the demand increases.",
      },
      {
        heading: "The practical methods",
        body: "For beginners: add weight every single session. 5 lbs per week on lower body lifts, 2.5 lbs per week on upper body. Do this until you can't. For intermediates: add weight weekly or every other week. Track every set, rep, and weight in a notebook or app. For advanced lifters: use rep PRs — if you hit 3x8 at a given weight, try 3x9 next week before adding weight. Microplates (1.25 lb plates) become essential at advanced levels.",
      },
      {
        heading: "The most common mistake",
        body: "Chasing novelty instead of progression. Constantly switching exercises, programs, or intensity techniques (supersets, drop sets, etc.) feels productive but often replaces the simple, boring work of adding weight to the same movement over time. Novelty creates soreness. Progressive overload creates adaptation. They are not the same thing. Stick with the same exercises long enough to actually get stronger at them.",
      },
    ],
    keyTakeaways: [
      "Progressive overload is the only mechanism for long-term strength and muscle gains.",
      "Any form of increased demand counts — weight, reps, sets, or density.",
      "Beginners should add weight every session. Intermediates: weekly. Advanced: monthly.",
      "Track every single workout. You cannot progressively overload what you don't measure.",
      "Novelty (new exercises) creates soreness, not adaptation. Don't confuse them.",
    ],
  },

  {
    id: "recovery-science",
    title: "The Science of Recovery",
    category: "Recovery",
    readTime: "7 min",
    color: "#c1cff8",
    excerpt: "Why rest days matter more than workout days, and how to structure active recovery, sleep, and nutrition to grow faster.",
    intro: "Most people think about training as the work that produces results. In reality, training is just the stimulus — the actual adaptation (muscle growth, strength increase, fat loss) happens during recovery. If you're not recovering optimally, you're leaving results on the table no matter how hard you train.",
    sections: [
      {
        heading: "What actually happens during recovery",
        body: "Training creates micro-damage in muscle fibers and depletes energy stores (glycogen). Your body responds by repairing the damage slightly stronger than before — this is called supercompensation. But supercompensation requires adequate protein, carbohydrates, and most importantly, sleep. Without sufficient recovery, the next training stimulus lands on a body that hasn't fully repaired. Over time, this leads to accumulated fatigue, stalled progress, and eventually overtraining.",
      },
      {
        heading: "Sleep: the highest-leverage recovery tool",
        body: "Deep sleep (slow-wave sleep) is when growth hormone peaks — this is when most muscle protein synthesis occurs. REM sleep consolidates motor patterns learned during training. 7–9 hours in a cool (65–68°F), dark room is non-negotiable for serious athletes. Alcohol disrupts REM sleep even in small doses. Training within 4 hours of bedtime elevates core temperature and delays sleep onset. Consistent sleep and wake times (even on weekends) are more important than total duration.",
      },
      {
        heading: "Active recovery versus passive rest",
        body: "Active recovery (Zone 1 walking, easy cycling, light swimming) increases blood flow without adding training stress. This accelerates the removal of metabolic waste products (lactate, creatinine) from muscles. On rest days, 20–30 minutes of easy movement is usually superior to complete inactivity. Passive rest is appropriate after very high training loads or when HRV indicates high fatigue.",
      },
      {
        heading: "Nutrition for accelerated recovery",
        body: "Post-workout: 20–40g of protein within 2 hours to initiate muscle protein synthesis. Carbohydrates replenish glycogen stores — critical if training again within 8–12 hours. Anti-inflammatory foods (fatty fish, tart cherry juice, turmeric, berries) demonstrably reduce DOMS. Creatine monohydrate (3–5g daily) consistently reduces recovery time and supports performance.",
      },
    ],
    keyTakeaways: [
      "Adaptation occurs during recovery, not during training. Training is just the stimulus.",
      "Sleep is the single most powerful recovery intervention — prioritize 7–9 hours.",
      "Active recovery (easy movement) outperforms complete rest on most rest days.",
      "Hit protein (20–40g) within 2 hours post-workout to initiate repair.",
      "Deload weeks every 4–8 weeks are mandatory, not optional. Plan them in advance.",
    ],
  },

  {
    id: "running-form",
    title: "Running Form Fundamentals",
    category: "Running",
    readTime: "6 min",
    color: "#7f9ef8",
    excerpt: "Fix your cadence, foot strike, and posture. These form cues will help you run faster, longer, and with far fewer injuries.",
    intro: "Most running injuries are preventable. Knee pain, IT band syndrome, shin splints, and plantar fasciitis are frequently caused by the same root issues: overstriding, poor posture, and low cadence. Improving your running form is the highest-ROI investment you can make in your running — it makes you faster and more durable simultaneously.",
    sections: [
      {
        heading: "Posture and body position",
        body: "Run tall with a slight forward lean from the ankles (not the waist). Your head should be neutral, eyes looking 20–30 meters ahead. Shoulders should be relaxed and low — not shrugged up toward your ears. Arms should swing forward and back (not across your body) at roughly 90 degrees, hands loosely cupped. Imagine a string pulling the crown of your head toward the sky.",
      },
      {
        heading: "Cadence: the most fixable metric",
        body: "Cadence is steps per minute. Elite runners average 170–180 spm. Most recreational runners are at 155–165 spm. Low cadence usually means overstriding — landing with your foot far ahead of your center of mass, which acts as a brake and massively increases impact force. Increasing cadence by just 5–10% reduces impact loading by 20–30%. Use a metronome app during training runs. Target 170–175 spm as your first goal.",
      },
      {
        heading: "Foot strike: what actually matters",
        body: "The heel-vs-forefoot debate is overblown. What matters is where your foot lands relative to your body — not which part of the foot hits first. Your foot should land roughly under or slightly ahead of your hip. Overstriding (landing 12+ inches ahead of your center of mass) is the problem, regardless of foot strike. Focus on quick, light steps and the foot strike will self-correct as cadence improves.",
      },
      {
        heading: "The most common form mistakes",
        body: "Crossing the midline with your arms (creates lateral rotation and energy waste). Vertical oscillation (bouncing up and down instead of moving forward — you want to travel horizontally). Looking down at the ground (collapses posture and strains the neck). Overstriding (most common and most injurious). Running with hands too tight (tension travels up the arm and into the shoulders and neck).",
      },
    ],
    keyTakeaways: [
      "Run tall with a slight forward lean from the ankles. Keep shoulders relaxed.",
      "Increase cadence to 170–175 spm to reduce overstriding and impact forces.",
      "Foot should land under or slightly ahead of the hip — not 12+ inches out front.",
      "Arms swing forward-back at 90°, never crossing the body's midline.",
      "Film yourself from the side every 4–6 weeks to track form improvements.",
    ],
  },

  {
    id: "hiit-vs-steady",
    title: "HIIT vs. Steady-State Cardio",
    category: "Cardio",
    readTime: "7 min",
    color: "#fad0f3",
    excerpt: "The real answer on which burns more fat — and why the right choice depends entirely on your current fitness level and goal.",
    intro: "HIIT got massively hyped in the 2010s as the superior form of cardio for fat loss. Then the steady-state advocates pushed back. The truth is more nuanced than either camp admits — and understanding the actual differences will help you make smarter training decisions.",
    sections: [
      {
        heading: "What the research actually shows",
        body: "HIIT (High-Intensity Interval Training) produces similar or slightly greater fat loss per unit of time compared to LISS (Low-Intensity Steady State), when calories are equated. The 'afterburn effect' (EPOC) is real but modest — typically an extra 50–150 calories over 24 hours. HIIT is also more effective at improving VO2 max and insulin sensitivity. However, HIIT requires higher recovery demand, limits how often you can train it, and has higher injury risk in deconditioned individuals.",
      },
      {
        heading: "Where steady-state wins",
        body: "Zone 2 training (60–70% max heart rate) is the most effective method for building the aerobic base that underlies all endurance performance. Mitochondrial density, fat oxidation capacity, and cardiac output all respond best to high volumes of Zone 2. It's also low-recovery, meaning you can do it frequently without impacting strength training. Most elite endurance athletes do 80% of their training in Zone 2 — the polarized training model is well-supported by research.",
      },
      {
        heading: "The real answer: use both",
        body: "For beginners: start with steady-state cardio only. Your body isn't ready for HIIT-level intensity, and the recovery demand competes with adaptation. For intermediates: 80% easy (Zone 2), 20% hard (Zone 4–5). This polarized approach consistently outperforms moderate-intensity training in endurance research. For fat loss specifically: both work. Pick the one you'll actually do consistently — because adherence beats optimization every time.",
      },
    ],
    keyTakeaways: [
      "HIIT and LISS produce similar fat loss when calories are equated. Neither is magic.",
      "HIIT improves VO2 max faster. Zone 2 builds aerobic base more efficiently.",
      "The 'afterburn effect' is real but small — don't overweight it.",
      "Beginners should start with steady-state only. Intensity requires a base to build on.",
      "The 80/20 rule (80% easy, 20% hard) is the most research-supported approach for endurance athletes.",
    ],
  },

  {
    id: "sleep-and-muscle",
    title: "Sleep & Muscle Growth",
    category: "Recovery",
    readTime: "5 min",
    color: "#c1cff8",
    excerpt: "You build muscle during sleep, not in the gym. Here's exactly how to optimize sleep quality for maximum recovery and growth.",
    intro: "The gym is where you create the stimulus for growth. Sleep is where the actual growth happens. Chronic sleep deprivation (less than 6 hours) reduces anabolic hormone output, increases cortisol, elevates muscle protein breakdown, and increases injury risk. You can't train your way out of poor sleep.",
    sections: [
      {
        heading: "The hormonal connection",
        body: "Growth hormone release peaks during slow-wave (deep) sleep — specifically in the first 2–3 sleep cycles of the night. Testosterone is synthesized primarily during REM sleep. Cortisol (catabolic — breaks down muscle tissue) drops during sleep and should be at its lowest in the early morning hours. Just one night of poor sleep reduces testosterone by 10–15% and elevates cortisol. Consistent poor sleep erases much of the hormonal environment needed for muscle growth.",
      },
      {
        heading: "What poor sleep actually costs you",
        body: "A study at the University of Chicago found that dieters who slept 5.5 hours vs. 8.5 hours lost the same total weight — but 60% more muscle mass in the short-sleep group. Another study found that athletes sleeping under 6 hours had 1.7x greater injury risk. Performance metrics (reaction time, power output, cardiovascular endurance) all decline measurably after a single poor night. Sleep debt accumulates and does not fully reverse with one good night.",
      },
      {
        heading: "Practical optimization",
        body: "Temperature: 65–68°F (18–20°C) is the optimal sleep temperature for most people — core temperature must drop 1–2°F to initiate sleep. Light: blackout curtains or eye mask. Even small amounts of light through eyelids suppress melatonin. Timing: the hours before midnight contain more slow-wave sleep than hours after midnight. Going to bed at 10pm vs. 1am can meaningfully increase deep sleep even with the same total duration. Consistency: your circadian rhythm is most sensitive to sleep timing — varying more than 30 minutes disrupts it.",
      },
    ],
    keyTakeaways: [
      "Growth hormone peaks during deep sleep — this is when muscle repair happens.",
      "One night under 6 hours reduces testosterone 10–15% and increases injury risk.",
      "65–68°F room temperature accelerates sleep onset and increases deep sleep.",
      "Bedtime before midnight yields more slow-wave sleep than late nights do.",
      "Consistent sleep/wake times (within 30 min, every day) are more impactful than total duration.",
    ],
  },

  {
    id: "meal-timing",
    title: "Meal Timing for Performance",
    category: "Nutrition",
    readTime: "6 min",
    color: "#7f9ef8",
    excerpt: "Pre-workout nutrition, post-workout windows, and intermittent fasting — what the evidence actually says about when you eat.",
    intro: "For decades, the fitness industry treated meal timing as almost as important as total nutrition. 'Anabolic window' supplements were sold based on the idea that timing was everything. The truth is more nuanced — timing matters, but not as much as total daily intake. Here's what the research actually supports.",
    sections: [
      {
        heading: "Pre-workout nutrition",
        body: "3–4 hours before training: a mixed meal with carbohydrates, protein, and low fat and fiber for maximum glycogen and minimal GI discomfort. 60–90 minutes before: small, fast-digesting carbs + 20–30g protein if you missed a meal. 30 minutes before: carbohydrates only (banana, sports drink, rice cake) if needed. Training fasted is fine for low-to-moderate intensity sessions but impairs performance and muscle protein synthesis in heavy strength training.",
      },
      {
        heading: "The post-workout window (what the research says)",
        body: "The 'anabolic window' — the idea that you must eat protein within 30 minutes of training or miss your gains — is overstated. The actual window is closer to 2–3 hours. However, if you trained fasted or it's been 4+ hours since your last meal, sooner is better. Target 20–40g of protein post-workout. Fast-digesting sources (whey, eggs, Greek yogurt) work fine but aren't meaningfully superior to whole food protein if total daily intake is on target.",
      },
      {
        heading: "Intermittent fasting and training",
        body: "IF can work well for fat loss because it reduces the opportunity to overeat. However, training in a fasted state consistently reduces performance on high-intensity work. If you practice IF, schedule your eating window to include pre- and post-workout meals whenever possible. For strength athletes specifically, compressed eating windows make it harder to hit high protein targets — this is the main practical limitation.",
      },
    ],
    keyTakeaways: [
      "Total daily protein and calories matter far more than exact timing.",
      "Pre-workout: mixed meal 3–4 hours before, or small carb + protein snack 60–90 min before.",
      "Post-workout window is 2–3 hours, not 30 minutes. Eat a protein-rich meal within that time.",
      "Training fasted impairs high-intensity performance. Low-intensity cardio is fine fasted.",
      "If doing IF, schedule your eating window around training, not the reverse.",
    ],
  },

  {
    id: "yoga-for-athletes",
    title: "Yoga for Strength Athletes",
    category: "Flexibility",
    readTime: "5 min",
    color: "#fffba5",
    excerpt: "The 10 yoga poses that make the biggest difference for lifters and runners — and a simple 15-minute mobility flow to do daily.",
    intro: "Yoga isn't just for flexibility — it builds body awareness, breathing control, and active mobility that translates directly to better movement in the gym. Tight hips limit squat depth. Poor thoracic mobility limits overhead pressing. Limited hamstring flexibility affects deadlift positioning. A 15-minute yoga practice addresses all of these. Here are the poses that move the needle most.",
    sections: [
      {
        heading: "The 10 essential poses for strength athletes",
        body: "1. Downward Dog — decompresses the spine, stretches hamstrings and calves. 2. Pigeon Pose — opens hip external rotators and hip flexors. Critical for squat and deadlift mechanics. 3. Low Lunge (Crescent) — stretches psoas/hip flexors bilaterally. 4. World's Greatest Stretch — combines hip flexor, hamstring, thoracic rotation in one pose. 5. Thread the Needle — thoracic rotation and shoulder mobility. 6. Child's Pose — lumbar and lat decompression. 7. Lizard Pose — deep hip flexor and groin opener. 8. Seated Forward Fold — posterior chain stretch. 9. Supine Twist — spinal rotation and oblique release. 10. Legs-Up-The-Wall — passive recovery and parasympathetic activation.",
      },
      {
        heading: "The 15-minute daily flow",
        body: "Morning or post-workout: Downward Dog (1 min) → Low Lunge each side (1 min each) → Pigeon each side (90 sec each) → World's Greatest Stretch each side (1 min each) → Thread the Needle each side (1 min each) → Supine Twist each side (1 min each) → Child's Pose (1 min). Move with breath — inhale to create length, exhale to deepen the stretch. Never force. Total: 15 minutes. Done consistently, this changes your movement quality within 4–6 weeks.",
      },
      {
        heading: "Active vs. passive flexibility",
        body: "Yoga builds passive flexibility (what your range of motion is when relaxed). To transfer this to the gym, you also need active mobility — the ability to control and produce force through that range. This is why yoga alone doesn't fix movement patterns. Pair yoga with active mobility work (CARs — controlled articular rotations, and loaded mobility work like goblet squat with thoracic rotation). Active mobility bridges yoga flexibility to athletic performance.",
      },
    ],
    keyTakeaways: [
      "Pigeon pose, Low Lunge, and World's Greatest Stretch address the most common lifter restrictions.",
      "15 minutes daily consistently beats 60 minutes twice a week.",
      "Move with breath — exhale to deepen, inhale to create space. Never force a stretch.",
      "Passive flexibility (yoga) + active mobility work = real performance transfer.",
      "Most lifters see measurable squat depth and shoulder flexibility improvements within 4–6 weeks.",
    ],
  },

  {
    id: "injury-prevention",
    title: "Avoiding the 5 Most Common Training Injuries",
    category: "Recovery",
    readTime: "8 min",
    color: "#c1cff8",
    excerpt: "Knee pain, shoulder impingement, lower back tightness — most training injuries are preventable. Here's how to train smart.",
    intro: "Most training injuries are not freak accidents — they're the result of predictable patterns: training too much too soon, ignoring mobility deficits, skipping warm-ups, and continuing through warning signs. Here are the five most common injuries in gym and endurance training, why they happen, and how to prevent each one.",
    sections: [
      {
        heading: "1. Knee pain (patellar tendinopathy and runner's knee)",
        body: "Cause: Weak VMO (inner quad), weak hip abductors, and overstriding in runners. The knee tracks inward under load. Prevention: Strengthen glutes and hip abductors (clamshells, lateral band walks, single-leg work). VMO-focused quad exercises (terminal knee extension, step-downs). Runners: increase cadence to reduce impact per step. Warning sign: dull ache below the kneecap during or after activity. Don't run through it — this one responds well to load modification, not rest.",
      },
      {
        heading: "2. Shoulder impingement",
        body: "Cause: Weak lower traps and serratus anterior, overactive upper traps and pecs. The shoulder blade doesn't rotate properly upward, causing the rotator cuff to impinge on the acromion. Prevention: Face pulls, band pull-aparts, and wall slides for 3 sets daily. Strengthen the serratus anterior (push-up plus, scapular push-up). Don't press through pain. Temporarily replace overhead pressing with landmine press. Warning sign: pain at the front or side of the shoulder at 90–120 degrees of arm elevation.",
      },
      {
        heading: "3. Lower back pain",
        body: "Cause: Usually hip flexor tightness, weak glutes, and poor core stability — not a 'weak back.' The lumbar spine compensates for hip mobility deficits. Prevention: Hip flexor stretching daily (pigeon, low lunge). Glute strengthening (hip thrusts, single-leg RDLs). Anti-extension core work (dead bug, ab wheel). Brace (don't just 'engage') your core on all loaded movements. Warning sign: sharp pain that doesn't warm up. This warrants medical evaluation, not more training.",
      },
      {
        heading: "4. IT Band Syndrome (runners)",
        body: "Cause: Overuse combined with weak hip abductors and a sudden increase in mileage. The iliotibial band rubs against the lateral femoral epicondyle at the knee. Prevention: Build mileage gradually (10% rule). Strengthen hip abductors and external rotators (clamshells, lateral band walks). Foam roll the TFL at the hip (not the IT band itself — the IT band is a dense fibrous structure that can't be 'rolled out'). Warning sign: sharp lateral knee pain that appears consistently at the same point in a run.",
      },
      {
        heading: "5. Rotator Cuff Strains",
        body: "Cause: Heavy pressing volume without balancing pull work, sudden eccentric load, or impingement that goes unaddressed. Prevention: Pull:Push ratio of at least 2:1 (two rows for every one press). Include external rotation work (band ER, side-lying ER) and rotator cuff strengthening (W raises, Y raises, T raises). Warm up rotator cuff before any pressing. Warning sign: deep aching pain in the shoulder at rest or pain with specific arm positions during pressing.",
      },
    ],
    keyTakeaways: [
      "Most training injuries are overuse injuries caused by load increasing faster than tissue can adapt.",
      "Weak glutes and hip abductors are implicated in knee, hip, and lower back injuries.",
      "Pull:push ratio of 2:1 prevents most shoulder injuries in lifters.",
      "The 10% rule (never increase weekly volume >10%) prevents most overuse injuries.",
      "Warning signs (sharp pain, pain that doesn't warm up, pain at rest) warrant stopping and evaluation.",
    ],
  },
];

export const GUIDES_BY_ID = Object.fromEntries(GUIDES.map((g) => [g.id, g]));

export const CATEGORY_COLORS: Record<string, string> = {
  Strength: "#aaa8ff",
  Nutrition: "#7f9ef8",
  Recovery: "#c1cff8",
  Running: "#7f9ef8",
  Cardio: "#fad0f3",
  Flexibility: "#fffba5",
};
