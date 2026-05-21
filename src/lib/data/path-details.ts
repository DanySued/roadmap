export type Task = {
  id: number;
  title: string;
  desc: string;
};

export type RoadmapLink = { label: string; icon: string };

export type RoadmapStage = {
  id: number;
  title: string;
  desc: string;
  duration: string;
  milestone: string;
  details: string[];
  links: RoadmapLink[];
};

export type RoadmapMeta = { value: string; label: string };

export type PathDetail = {
  title: string;
  desc: string;
  tasks: Task[];
  roadmapMeta?: RoadmapMeta[];
  roadmapStages?: RoadmapStage[];
};

export const PATH_DATA: Record<string, PathDetail> = {
  // ── BY SPORT ──────────────────────────────────────────────────────────────

  "strength-training": {
    title: "Strength Training",
    desc: "Build muscle and progressive strength through resistance training",
    tasks: [
      { id: 1, title: "Learn proper form fundamentals", desc: "Master squats, deadlifts, and bench press with light weights. Film yourself from the side to review your technique." },
      { id: 2, title: "Establish your strength baseline", desc: "Test your 5-rep max on squat, bench, and deadlift to set starting weights for your program." },
      { id: 3, title: "Run a linear progression block (4 weeks)", desc: "Add 2–5% weight every session. 3 days per week, full-body compound movements only." },
      { id: 4, title: "Hypertrophy phase — 6 to 12 reps", desc: "Switch to moderate weight, 3–5 sets of 6–12 reps. Focus on time under tension and muscle connection." },
      { id: 5, title: "Strength phase — 3 to 6 reps", desc: "Heavy compound work at 80–90% 1RM. Lower volume, longer rest, max neural recruitment." },
      { id: 6, title: "Introduce periodization", desc: "Plan 4-week training blocks with progressive overload followed by a deload week. Track every session." },
      { id: 7, title: "Test your peak strength", desc: "Attempt a new 1-rep max on your main lifts. Compare to your baseline from Stage 2." },
    ],
  },

  "running": {
    title: "Running",
    desc: "Training progression from beginner to marathon runner",
    tasks: [
      { id: 1, title: "Start with walk/run intervals", desc: "Alternate 1 min running with 2 min walking for 20 minutes, 3x per week. Don't go faster than a conversational pace." },
      { id: 2, title: "Build to continuous 5K", desc: "Gradually extend running intervals until you can run 5K (3.1 miles) without stopping." },
      { id: 3, title: "Add speed work for 5K", desc: "Include one tempo run and one interval session per week to improve pace and efficiency." },
      { id: 4, title: "Build weekly mileage to 25–30 miles", desc: "Increase total weekly distance by no more than 10% per week. Add a long run every Sunday." },
      { id: 5, title: "Complete a half marathon", desc: "Follow a 10–12 week half marathon plan. Focus on easy miles and one long run per week." },
      { id: 6, title: "Build marathon base", desc: "Spend 8–12 weeks building aerobic base with long runs reaching 16–18 miles." },
      { id: 7, title: "Race your marathon", desc: "Complete a 16-week marathon plan, taper properly the last 3 weeks, and execute your race day strategy." },
    ],
    roadmapMeta: [
      { value: "26 wks", label: "Total duration" },
      { value: "7", label: "Stages" },
      { value: "Marathon", label: "End goal" },
      { value: "Intermediate", label: "Difficulty" },
    ],
    roadmapStages: [
      {
        id: 1, title: "Walk / run intervals", duration: "Weeks 1–3",
        milestone: "First steps",
        desc: "You'll feel like you're cheating because you're walking half of it. You're not — this is exactly how every marathoner started.",
        details: ["20 minutes out, three days a week — never back-to-back", "Run 1 minute, walk 2. If you can't hold a conversation while running, slow down", "The walking isn't a break. It's the whole point right now", "Each session should feel almost too easy. That's correct"],
        links: [{ label: "Beginner walk/run plan (PDF)", icon: "clipboard-list" }, { label: "Why slow miles work", icon: "book-open" }, { label: "Heart-rate zone primer", icon: "heart-pulse" }],
      },
      {
        id: 2, title: "First continuous 5K", duration: "Weeks 4–6",
        milestone: "3.1 miles straight",
        desc: "Three miles without stopping. Sounds manageable until you hit mile 2.5 and your legs have opinions.",
        details: ["Every other session, add 30 seconds to your running intervals", "Week 6 target: one 30-minute run without walking", "Don't chase pace — finishing without stopping is the only goal", "If you need to walk, walk. Then run again. That still counts"],
        links: [{ label: "5K base-build plan", icon: "clipboard-list" }, { label: "Form check video", icon: "play" }],
      },
      {
        id: 3, title: "Learning to hurt a little", duration: "Weeks 7–9",
        milestone: "Speed work",
        desc: "Tempo runs are supposed to feel hard. That discomfort is your aerobic ceiling moving up.",
        details: ["One tempo run a week — 20 minutes at 'comfortably hard,' not sprinting", "One track session — 6 × 400m with 90 seconds jogging between", "Everything else this week is slow and easy. Don't skip the easy runs", "Hard days hard, easy days easy. Most people get this backwards"],
        links: [{ label: "Tempo vs threshold explained", icon: "book-open" }, { label: "Track session walkthrough", icon: "play" }, { label: "Pace calculator", icon: "target" }],
      },
      {
        id: 4, title: "Building the base", duration: "Weeks 10–14",
        milestone: "30 miles a week",
        desc: "The marathon isn't run on race day. It's run in these quiet weeks of stacking miles nobody sees.",
        details: ["Add no more than 10% to your weekly total. Seriously, not more", "One long run on Sunday. Your shortest run goes Monday", "Every fourth week, cut mileage by 20% — your body needs to absorb the work", "If something hurts two days in a row, rest. Pain is information"],
        links: [{ label: "Mileage build calculator", icon: "trending-up" }, { label: "Injury prevention checklist", icon: "shield" }],
      },
      {
        id: 5, title: "Going long", duration: "Weeks 15–20",
        milestone: "18-mile long run",
        desc: "The long run is lonely some days. It's also where you find out what you're made of.",
        details: ["Add 2 miles to your long run every other week, not every week", "You're targeting 18 miles by week 20 — don't rush it", "Eat something every 45 minutes on runs over 90 minutes. Practice this now, not on race day", "Run slow enough that you could tell a story. Then go slower"],
        links: [{ label: "Long-run fueling guide", icon: "apple" }, { label: "Hydration & electrolytes", icon: "waves" }, { label: "Recovery protocols", icon: "moon" }],
      },
      {
        id: 6, title: "Running race pace", duration: "Weeks 21–24",
        milestone: "Pace rehearsal",
        desc: "This is when goal pace stops being a number on a calculator and starts being a feeling in your legs.",
        details: ["Bury a 6–10 mile block at goal marathon pace inside your long run", "Wear exactly what you'll race in. Your shoes, your shorts, your fuel", "Lock in your goal time. Write your splits on your wrist if you have to", "You should finish these sessions tired but not wrecked"],
        links: [{ label: "Race-day kit checklist", icon: "clipboard-list" }, { label: "Marathon pacing strategy", icon: "target" }],
      },
      {
        id: 7, title: "Taper & race day", duration: "Weeks 25–26",
        milestone: "Race week",
        desc: "You've done the work. The taper feels like doing nothing — that's the point, and it's working.",
        details: ["Drop mileage 30% in week 25, another 50% in race week. Trust the process", "Keep 2–3 short runs with a few strides so your legs remember what fast feels like", "Sleep more than you think you need to. Eat carbs. Don't try new shoes", "On race morning: nothing new. Nothing. Not the gel, not the socks, not the breakfast"],
        links: [{ label: "Two-week taper plan", icon: "calendar" }, { label: "Race-morning checklist", icon: "trophy" }],
      },
    ],
  },

  "yoga": {
    title: "Yoga",
    desc: "Yoga journey from basics to advanced asanas and mindfulness",
    tasks: [
      { id: 1, title: "Learn fundamental poses", desc: "Mountain pose, downward dog, cat-cow, child's pose. Practice 10 minutes daily and focus on alignment." },
      { id: 2, title: "Build flexibility with gentle flows", desc: "Hold stretches for 60–90 seconds. Practice yin yoga 3x per week to open hips and hamstrings." },
      { id: 3, title: "Master breathwork (pranayama)", desc: "Learn ujjayi breathing, box breathing, and alternate nostril breathing. Integrate breath into every pose." },
      { id: 4, title: "Perfect sun salutations", desc: "Flow through Sun Salutation A & B smoothly. Build to 20 rounds continuous, matching breath to movement." },
      { id: 5, title: "Standing pose series", desc: "Warrior I, II, III, triangle, extended side angle, half moon. Hold each for 5+ breaths with strong foundation." },
      { id: 6, title: "Introduction to arm balances", desc: "Crow pose, side crow, and handstand prep drills. Build wrist strength and core stability." },
      { id: 7, title: "Advanced inversions", desc: "Headstand, shoulder stand, and scorpion pose. Always practice near a wall until fully stable." },
      { id: 8, title: "Integrate meditation practice", desc: "20+ minutes of daily seated meditation. Combine asana, pranayama, and mindfulness into a complete practice." },
    ],
  },

  "cycling": {
    title: "Cycling",
    desc: "Path to becoming a strong, efficient cyclist",
    tasks: [
      { id: 1, title: "Get a professional bike fit", desc: "A proper fit improves power output and prevents injury. Adjust saddle height, cleat position, and reach." },
      { id: 2, title: "Build base endurance", desc: "Ride comfortably for 2–3 hours at Zone 2 pace (conversational). 3–4 rides per week." },
      { id: 3, title: "Master cadence and gearing", desc: "Target 90–100 RPM using proper gearing. Use a cadence sensor or power meter to monitor." },
      { id: 4, title: "Add hill training", desc: "One hill repeat session per week. Seated climbs for strength, standing sprints for power." },
      { id: 5, title: "Introduce interval work", desc: "VO2 max efforts (4–8 min), threshold intervals (20–30 min), and sprint work. One hard session per week." },
      { id: 6, title: "Build to 4–5 hour rides", desc: "Practice on-bike nutrition — 60–90g carbs per hour. Learn to fuel before the hunger hits." },
      { id: 7, title: "Complete a century ride (100 miles)", desc: "Taper the week before, plan your nutrition strategy, and ride your first 100-mile event." },
    ],
  },

  "nutrition": {
    title: "Nutrition Coaching",
    desc: "Master nutrition science and meal planning",
    tasks: [
      { id: 1, title: "Learn macronutrient fundamentals", desc: "Understand the roles of protein (building), carbohydrates (fuel), and fat (hormones). Learn calorie densities." },
      { id: 2, title: "Calculate your calorie targets", desc: "Determine TDEE using the Mifflin-St Jeor equation. Set a goal-appropriate deficit or surplus." },
      { id: 3, title: "Build your first 7-day meal plan", desc: "Design meals that hit your macro targets. Aim for whole foods, adequate fiber, and variety." },
      { id: 4, title: "Master weekly meal prep", desc: "Batch cook proteins and carbs. Prep vegetables. Build a consistent weekly rhythm on Sunday." },
      { id: 5, title: "Pre/post-workout nutrition", desc: "Eat carbs + protein 1–2 hours before training. Consume protein within 2 hours post-workout." },
      { id: 6, title: "Understand evidence-based supplements", desc: "Creatine monohydrate, protein powder, and vitamin D are the only consistently proven supplements." },
      { id: 7, title: "Periodize your nutrition", desc: "Match calorie intake to training load. Eat more on hard training days, less on rest days." },
    ],
  },

  "crossfit": {
    title: "CrossFit",
    desc: "Training foundation for functional fitness and competition",
    tasks: [
      { id: 1, title: "Learn foundational movements", desc: "Air squat, push-up, pull-up, box jump, burpee, kettlebell swing. Master technique before adding load." },
      { id: 2, title: "Build gymnastics skill baseline", desc: "Kipping pull-up, toes-to-bar, handstand holds, and ring rows. Core strength is the foundation." },
      { id: 3, title: "Olympic lifting fundamentals", desc: "Power clean, hang clean, push jerk, and snatch. Work with a coach for technique cues before loading." },
      { id: 4, title: "Complete beginner WODs consistently", desc: "Do 3 WODs per week, scaled to your level. Focus on pacing — don't sprint and die on minute 2." },
      { id: 5, title: "Build your conditioning engine", desc: "Row, ski, assault bike, and jump rope. Build capacity in all mono-structural cardio modalities." },
      { id: 6, title: "Scale up to Rx weights", desc: "Work toward prescribed weights on benchmark WODs (Fran, Helen, Cindy). Track your times." },
      { id: 7, title: "Compete in a local event", desc: "Enter a local CrossFit throwdown or open competition. The competitive environment reveals your gaps." },
    ],
  },

  "pilates": {
    title: "Pilates",
    desc: "Core strength and body control through pilates",
    tasks: [
      { id: 1, title: "Learn the Pilates principles", desc: "Centering, concentration, control, precision, breath, and flow. These principles guide every movement." },
      { id: 2, title: "Mat fundamentals", desc: "The Hundred, Roll-Up, Single Leg Stretch, and Double Leg Stretch. Focus on neutral spine and breath coordination." },
      { id: 3, title: "Build core stability series", desc: "Dead bug, bird dog, Pilates plank, and side-lying leg series. Find and maintain your powerhouse engagement." },
      { id: 4, title: "Intermediate mat sequence", desc: "Rolling like a ball, spine stretch forward, saw, swan, and double leg kick. Increase pace and flow." },
      { id: 5, title: "Reformer introduction", desc: "Footwork, elephant, short spine, and long stretch series. The spring tension provides feedback instant feedback." },
      { id: 6, title: "Advanced mat work", desc: "Boomerang, control balance, corkscrew, and jackknife. Requires full core mastery and spinal articulation." },
      { id: 7, title: "Full repertoire mastery", desc: "Flow through a complete 45-minute mat or reformer session without stopping. Precision over speed." },
    ],
  },

  "swimming": {
    title: "Swimming",
    desc: "Learn proper technique and endurance for swimming",
    tasks: [
      { id: 1, title: "Build water comfort and floating", desc: "Practice breath control, treading water, and relaxed floating on your back. Remove fear first, technique second." },
      { id: 2, title: "Learn freestyle technique", desc: "Body position (flat and horizontal), bilateral breathing, high elbow catch, and rotation. Use fins initially." },
      { id: 3, title: "Build to 500m continuous", desc: "Gradually increase distance. Focus on maintaining technique when fatigued. Aim for 30–40 strokes per minute." },
      { id: 4, title: "Add backstroke and breaststroke", desc: "Learn the timing and body mechanics of backstroke and breaststroke to become a complete swimmer." },
      { id: 5, title: "Master flip turns and open turns", desc: "Learn tumble turns for competitive training. Open turns for triathlon prep. Efficiency at the wall matters." },
      { id: 6, title: "Structured interval sets", desc: "Swim 10 x 100m on 2:00 rest interval. Mix sprints, threshold, and endurance sets each week." },
      { id: 7, title: "Open water swimming", desc: "Swim in a lake, ocean, or open water event. Practice sighting technique (every 10 strokes)." },
    ],
  },

  "boxing": {
    title: "Boxing",
    desc: "Master stance, technique, and boxing fundamentals",
    tasks: [
      { id: 1, title: "Learn stance and footwork", desc: "Orthodox vs southpaw stance, weight distribution (60/40 back/front), lateral steps, and pivoting." },
      { id: 2, title: "Master the jab and cross", desc: "The jab (1) sets up everything. Cross (2) is your power shot. Drill 100x daily until automatic." },
      { id: 3, title: "Add hook and uppercut", desc: "Hook generates power from hip rotation. Uppercut from the knees up. Both require full body mechanics." },
      { id: 4, title: "Defense fundamentals", desc: "Slip (head movement), roll (against hooks), parry (redirecting punches), and guard positioning." },
      { id: 5, title: "Build 3–6 punch combinations", desc: "1-2, 1-2-3, 1-2-3-2, jab-body-head. Learn to set up combinations with the jab." },
      { id: 6, title: "Heavy bag and pad work", desc: "3-minute rounds on the heavy bag with 1-minute rest. 6–12 rounds. Work specific combos and footwork patterns." },
      { id: 7, title: "Introduction to sparring", desc: "Light technical sparring (no power) with a coach or partner. Focus on applying technique, not winning." },
    ],
  },

  "martial-arts": {
    title: "Martial Arts",
    desc: "Progress through belts and master martial arts discipline",
    tasks: [
      { id: 1, title: "Learn stances and basic strikes", desc: "Forward stance, horse stance, front kick, roundhouse kick, and basic hand strikes. Drill 20 min daily." },
      { id: 2, title: "White belt curriculum mastery", desc: "Complete all white belt requirements: basic blocks, strikes, and intro forms (kata). Test for yellow belt." },
      { id: 3, title: "Forms (kata) progression", desc: "Learn and perfect 2–3 katas for your belt level. Each kata tells a story — understand the applications." },
      { id: 4, title: "Partner drill and sparring fundamentals", desc: "One-step sparring, three-step sparring, light free sparring with controlled contact and proper protective gear." },
      { id: 5, title: "Intermediate technique development", desc: "Spinning kicks, joint locks, takedown defense, and combination techniques. Spar with increasing intensity." },
      { id: 6, title: "Competition preparation", desc: "Enter a local tournament for kata and/or sparring. Competing at least once is required for mental development." },
      { id: 7, title: "Advanced techniques and belt testing", desc: "Self-defense applications, weapons forms (if applicable), advanced kumite. Prepare for your black belt exam." },
    ],
  },

  "pt-certification": {
    title: "Personal Training Cert",
    desc: "Become a certified personal trainer and coach",
    tasks: [
      { id: 1, title: "Anatomy and physiology fundamentals", desc: "Skeletal and muscular systems, energy pathways, and how the body adapts to exercise at a cellular level." },
      { id: 2, title: "Exercise science and biomechanics", desc: "Movement planes, joint actions, force-velocity curve, and principles of training (FITT, SAID, GAS)." },
      { id: 3, title: "Client assessment skills", desc: "PAR-Q, postural assessment, movement screening (FMS), and fitness testing protocols." },
      { id: 4, title: "Program design mastery", desc: "Needs analysis, periodization models, exercise selection, and progressive overload for diverse client goals." },
      { id: 5, title: "Nutrition coaching fundamentals", desc: "Scope of practice, macronutrient education, and evidence-based nutrition guidance within legal limits." },
      { id: 6, title: "Business and client acquisition", desc: "Building a client pipeline, session pricing, referral systems, and training business fundamentals." },
      { id: 7, title: "Pass your certification exam", desc: "NASM, ACE, ISSA, or NSCA exam. Study the CPT textbook, take practice exams, schedule your test date." },
    ],
  },

  "rehab-therapy": {
    title: "Rehab & Recovery",
    desc: "Learn injury recovery and rehabilitation techniques",
    tasks: [
      { id: 1, title: "Understand your injury", desc: "Learn the anatomy of your specific injury. Understand tissue healing timelines (acute 0–72hrs, sub-acute, remodeling)." },
      { id: 2, title: "Acute care protocol (PRICE)", desc: "Protection, Rest, Ice, Compression, Elevation. Manage inflammation in the first 72 hours correctly." },
      { id: 3, title: "Restore range of motion", desc: "Gentle mobility work within pain-free range. Progress daily. Pain-free movement is the first goal." },
      { id: 4, title: "Rebuild strength and stability", desc: "Isometric exercises first, then eccentric loading, then full concentric-eccentric range." },
      { id: 5, title: "Functional movement restoration", desc: "Relearn the movement patterns affected by injury. FMS re-screening to track progress." },
      { id: 6, title: "Sport-specific return protocol", desc: "Progressive loading back to full sport intensity. Pass functional performance tests before returning to full activity." },
      { id: 7, title: "Long-term injury prevention plan", desc: "Address the root cause of injury. Build corrective programming into your regular training permanently." },
    ],
  },

  // ── BY GOAL ───────────────────────────────────────────────────────────────

  "strength-building": {
    title: "Strength Building",
    desc: "Programs to build muscle and increase max strength",
    tasks: [
      { id: 1, title: "Establish your strength baseline", desc: "Test 5-rep max on squat, bench press, deadlift, and overhead press. Record everything." },
      { id: 2, title: "Master the big compound lifts", desc: "Squat, deadlift, bench press, overhead press. Perfect technique is the foundation of every strength program." },
      { id: 3, title: "Run a linear progression program", desc: "Starting Strength or GZCLP. Add weight every session. Ride linear gains as far as they go." },
      { id: 4, title: "Add targeted accessory work", desc: "Romanian deadlifts, rows, dips, chin-ups. Fill in weak points identified during your compound lifts." },
      { id: 5, title: "Transition to intermediate programming", desc: "GZCLP, 5/3/1, or Texas Method. Weekly progression instead of session-to-session." },
      { id: 6, title: "Specialize for competition lifts", desc: "If powerlifting: squat/bench/deadlift focus. If weightlifting: clean & jerk/snatch." },
      { id: 7, title: "Peak and test new maxes", desc: "Run a 4-week peaking block. Reduce volume, maintain intensity, taper for 1–2 days, then test." },
    ],
  },

  "cardio-endurance": {
    title: "Cardio Endurance",
    desc: "Build cardiovascular health and aerobic capacity",
    tasks: [
      { id: 1, title: "Build aerobic base with Zone 2 training", desc: "Train at 60–70% max HR for 30–60 minutes, 3–4x per week. You should be able to hold a full conversation." },
      { id: 2, title: "Extend duration gradually", desc: "Add 10% more time or distance per week. Build to 60+ minute sessions before adding intensity." },
      { id: 3, title: "Add tempo (threshold) work", desc: "Train at 80–85% max HR for 20–40 minute blocks. This pushes your lactate threshold higher." },
      { id: 4, title: "Introduce VO2 max intervals", desc: "4–6 x 4-minute efforts at 90–95% max HR with equal rest. 1–2 sessions per week maximum." },
      { id: 5, title: "Sport-specific conditioning", desc: "Apply your fitness to your chosen sport. Running, rowing, cycling, swimming — specificity matters." },
      { id: 6, title: "Peak for an endurance event", desc: "Enter a 5K, 10K, half marathon, or triathlon. Racing tests your fitness in ways training cannot." },
      { id: 7, title: "Maintain with minimum effective dose", desc: "2 sessions per week (one Zone 2, one threshold) maintains most of your aerobic fitness." },
    ],
  },

  "flexibility": {
    title: "Flexibility & Mobility",
    desc: "Increase range of motion and prevent injuries",
    tasks: [
      { id: 1, title: "Daily 10-minute stretch routine", desc: "Hip flexors, hamstrings, thoracic spine, shoulders. Morning or post-workout — consistency beats duration." },
      { id: 2, title: "Hip flexor and hamstring focus", desc: "90/90 stretch, pigeon pose, standing hamstring stretch. Most people's biggest limiters are hips and hamstrings." },
      { id: 3, title: "Thoracic and shoulder mobility", desc: "Thoracic rotation, thread-the-needle, band pull-aparts, shoulder CARs. Essential for upper body work." },
      { id: 4, title: "Learn PNF stretching", desc: "Contract-relax method: hold 6 seconds, relax, deepen stretch. 30–40% more effective than passive stretching." },
      { id: 5, title: "Dynamic warm-up mastery", desc: "Leg swings, hip circles, arm circles, inchworm, world's greatest stretch. Replace static pre-workout stretching." },
      { id: 6, title: "Yin yoga integration", desc: "3–5 minute holds in passive poses. Targets connective tissue and fascia rather than just muscle." },
      { id: 7, title: "Full body flow sequence", desc: "Move through a 20-minute mobility flow from head to toe, connecting all movements with breath." },
    ],
  },

  "weight-loss": {
    title: "Weight Loss",
    desc: "Science-backed program for sustainable weight loss",
    tasks: [
      { id: 1, title: "Calculate your calorie target", desc: "Find your TDEE using an online calculator. Create a 300–500 calorie daily deficit. No more — sustainable beats fast." },
      { id: 2, title: "Build your nutrition foundation", desc: "Hit your protein target first (0.7–1g per lb bodyweight). Protein preserves muscle during a deficit." },
      { id: 3, title: "Start resistance training", desc: "Lift 2–3x per week to preserve muscle mass. A calorie deficit without lifting causes muscle loss." },
      { id: 4, title: "Add cardio progressively", desc: "Start with 20 min of walking daily. Add intensity only after 2–3 weeks of consistent compliance." },
      { id: 5, title: "Track and review every 2 weeks", desc: "If not losing 0.5–1 lb per week, reduce calories by 100–200. If losing too fast, add 100–200." },
      { id: 6, title: "Break through a plateau", desc: "Diet breaks (eating at maintenance for 2 weeks) reset leptin and prevent adaptation. Plan one after 8–12 weeks." },
      { id: 7, title: "Transition to maintenance", desc: "Reverse diet back to maintenance calories over 4–6 weeks. Maintain weight within 3–5 lbs of goal." },
    ],
  },

  "muscle-building": {
    title: "Muscle Building",
    desc: "Hypertrophy training to maximize muscle growth",
    tasks: [
      { id: 1, title: "Set up a calorie surplus", desc: "Eat 200–300 calories above TDEE. Lean bulk: gain 0.5–1 lb per month to minimize fat gain." },
      { id: 2, title: "Hit your protein target daily", desc: "0.7–1g per lb of bodyweight every day. Protein is the most critical variable for muscle growth." },
      { id: 3, title: "Train in the hypertrophy range", desc: "8–15 reps, 3–5 sets per exercise, 2–3x per muscle per week. Train each muscle close to failure." },
      { id: 4, title: "Develop mind-muscle connection", desc: "Slow the eccentric (lowering) to 3 seconds. Squeeze at the top. Feel the target muscle working." },
      { id: 5, title: "Track progressive overload", desc: "Add reps or weight every 1–2 weeks. If you're not progressing, you're not growing." },
      { id: 6, title: "Program deload weeks", desc: "Every 4–8 weeks, reduce volume by 40–50% for a week. This is when growth actually occurs." },
      { id: 7, title: "Assess body composition progress", desc: "Track waist measurements and progress photos monthly. Scale weight alone is misleading during a bulk." },
    ],
  },

  "nutrition-basics": {
    title: "Nutrition Fundamentals",
    desc: "Learn macros, calories, and nutrition science",
    tasks: [
      { id: 1, title: "Understand the three macronutrients", desc: "Protein (4 cal/g): builds tissue. Carbohydrates (4 cal/g): primary fuel. Fat (9 cal/g): hormones and fat-soluble vitamins." },
      { id: 2, title: "Learn to track calories", desc: "Use MyFitnessPal or Cronometer for 2 weeks. Track everything — even condiments. Awareness is the tool." },
      { id: 3, title: "Build the balanced plate method", desc: "Half plate vegetables, quarter protein, quarter complex carbs, thumb-sized fat. No calorie counting needed." },
      { id: 4, title: "Master meal prep basics", desc: "Cook proteins in bulk (oven chicken, ground beef). Roast vegetables in batches. Prep grains in advance." },
      { id: 5, title: "Learn to read food labels", desc: "Check serving size first. Then protein per calorie density. Ignore front-of-package marketing claims." },
      { id: 6, title: "Optimize hydration", desc: "0.5–1 oz of water per lb of bodyweight daily. Add an extra 16 oz for every hour of exercise." },
      { id: 7, title: "Apply sport nutrition principles", desc: "Carb timing around training. Protein within 2 hours post-workout. Electrolytes for sessions over 90 minutes." },
    ],
  },

  "5k-training": {
    title: "5K Training",
    desc: "8-week program to run a strong 5K",
    tasks: [
      { id: 1, title: "Weeks 1–2: Walk/run intervals", desc: "Run 1 min, walk 2 min, repeat for 20–25 minutes. 3 sessions per week. Don't worry about pace." },
      { id: 2, title: "Weeks 3–4: Build to 20 min continuous", desc: "Extend running intervals progressively. End of week 4: run 20 minutes without stopping." },
      { id: 3, title: "Week 5: Add your first tempo run", desc: "Run one session per week at a comfortably hard pace (can say a few words but not hold a conversation)." },
      { id: 4, title: "Week 6: Practice race-pace efforts", desc: "3 x 1 mile at goal 5K pace with 2 min walk recovery. Teaches your legs what race pace feels like." },
      { id: 5, title: "Week 7: Peak training week", desc: "Your highest volume week: 3 easy runs + one tempo. No skipping — fitness is built here." },
      { id: 6, title: "Week 8: Taper and race prep", desc: "Cut volume in half. 2 easy runs only. Sleep well, eat well, and set your race day logistics." },
      { id: 7, title: "Race day execution", desc: "Start 10 seconds per mile slower than goal pace. Build intensity at mile 2. Empty the tank at mile 2.5." },
    ],
  },

  "marathon-training": {
    title: "Marathon Training",
    desc: "16-week program to complete your first marathon",
    tasks: [
      { id: 1, title: "Base phase (weeks 1–4): Build to 30 miles/week", desc: "All easy running. Long run builds to 12 miles. 4–5 days per week. Heart rate stays conversational." },
      { id: 2, title: "Build phase (weeks 5–8): Long run to 16 miles", desc: "Add midweek medium long run. First marathon-pace segments in long runs. Weekly mileage hits 35–40." },
      { id: 3, title: "Intensity phase (weeks 9–12): Race-specific work", desc: "Marathon-pace long runs. Tempo runs at half marathon effort. Long run peaks at 20 miles." },
      { id: 4, title: "Peak week (week 13): 48–55 miles", desc: "Your highest mileage week. One final 20-mile long run. Back-to-back medium runs midweek." },
      { id: 5, title: "Taper week 1 (week 14): Drop to 35 miles", desc: "Cut long run to 13 miles. Keep intensity in short sessions. You will feel terrible — that's normal." },
      { id: 6, title: "Taper week 2 (weeks 15–16): 25 then 10 miles", desc: "Mostly easy running with a few short race-pace segments. Stay off your feet 2 days before the race." },
      { id: 7, title: "Race day: Execute your plan", desc: "Start at 45 sec/mile slower than goal pace. Fuel every 45 minutes. Run your race at mile 18." },
    ],
  },

  "core-strength": {
    title: "Core Strength",
    desc: "Build a stronger, more stable core",
    tasks: [
      { id: 1, title: "Baseline assessment", desc: "Max plank hold, dead bug reps, and hollow body hold. Know where you're starting from." },
      { id: 2, title: "Anti-extension exercises", desc: "Plank variations, ab wheel rollout, and RKC plank. Teaches the core to resist spinal extension under load." },
      { id: 3, title: "Anti-rotation exercises", desc: "Pallof press, half-kneeling chop and lift. Resisting rotation protects the spine in real movement." },
      { id: 4, title: "Anti-lateral flexion exercises", desc: "Suitcase carry, side plank, Copenhagen side plank. Lateral stability prevents lower back injury." },
      { id: 5, title: "Hip flexor strength and stability", desc: "Leg raises, L-sit progression, and reverse hypers. Hip flexors are part of the core — don't ignore them." },
      { id: 6, title: "Loaded carries and full-body integration", desc: "Farmer's carry, waiter's walk, and sled push. Moving under load is the truest test of core stability." },
      { id: 7, title: "Integrate into all compound lifts", desc: "Brace your core on every squat, deadlift, and press. Re-test your baseline — plank should be 2x your original." },
    ],
  },

  "athletic-performance": {
    title: "Athletic Performance",
    desc: "Enhance speed, power, and athletic ability",
    tasks: [
      { id: 1, title: "Functional movement screen (FMS)", desc: "Assess the 7 movement patterns: deep squat, hurdle step, inline lunge, shoulder mobility, ASLR, trunk stability, rotary stability." },
      { id: 2, title: "Build your strength foundation", desc: "Squat, hip hinge, push, pull — all compound movements. Strength is the foundation of all athletic qualities." },
      { id: 3, title: "Power development (plyometrics)", desc: "Box jumps, broad jumps, medicine ball throws, and Olympic lift derivatives. Power = strength x speed." },
      { id: 4, title: "Speed and agility development", desc: "Sprint mechanics (acceleration vs max velocity), ladder drills, pro agility cone drill, reaction drills." },
      { id: 5, title: "Energy system training", desc: "Sport-specific conditioning: alactic (0–10 sec), lactic (10 sec–2 min), aerobic (2+ min). Train all three." },
      { id: 6, title: "Mental performance and visualization", desc: "Pre-competition routines, visualization practice, and performance mindset under pressure." },
      { id: 7, title: "Peak performance testing", desc: "Vertical jump, 40-yard dash, Yo-Yo test, 1RM squat. Compare to your FMS baseline results." },
    ],
  },

  "recovery-protocols": {
    title: "Recovery Protocols",
    desc: "Optimize recovery with sleep, stretching, and nutrition",
    tasks: [
      { id: 1, title: "Sleep optimization", desc: "7–9 hours in a cold (65–68°F), dark room. No screens 60 min before bed. Consistent sleep/wake times." },
      { id: 2, title: "Active recovery techniques", desc: "Easy walk, light cycling, or swim on rest days. 20–30 minutes at Zone 1 pace clears metabolic waste." },
      { id: 3, title: "Foam rolling and myofascial release", desc: "10 minutes post-workout: quads, IT band, glutes, upper back, lats. 60 second holds on tender spots." },
      { id: 4, title: "Cold and heat therapy", desc: "Cold water immersion (10–15°C for 10–15 min) reduces inflammation. Heat increases blood flow and flexibility." },
      { id: 5, title: "Nutrition for recovery", desc: "Post-workout: 20–40g protein + carbs within 2 hours. Tart cherry juice reduces DOMS. Omega-3s reduce inflammation." },
      { id: 6, title: "HRV monitoring", desc: "Track morning heart rate variability with Whoop or Oura. Use it to decide training intensity each day." },
      { id: 7, title: "Build a recovery-first mindset", desc: "Periodize recovery like you periodize training. Plan deload weeks. Progress is made during rest, not effort." },
    ],
  },

  "injury-prevention": {
    title: "Injury Prevention",
    desc: "Prevent common injuries through smart training",
    tasks: [
      { id: 1, title: "Movement quality assessment", desc: "Identify mobility restrictions and movement asymmetries that predispose you to injury before they become injuries." },
      { id: 2, title: "Mobility and flexibility baseline", desc: "Hip flexor length, hamstring flexibility, shoulder internal rotation, and ankle dorsiflexion. Address deficits first." },
      { id: 3, title: "Corrective exercise programming", desc: "Glute activation (clamshells, glute bridges), hip strengthening, rotator cuff work, scapular stability." },
      { id: 4, title: "Master your warm-up protocol", desc: "5 minutes minimum: raise heart rate, activate key muscles, move through full ROM. Never skip this." },
      { id: 5, title: "Learn load management principles", desc: "The 10% rule: never increase weekly volume by more than 10%. Understand acute:chronic workload ratio." },
      { id: 6, title: "Strengthen injury-prone areas", desc: "Knee: VMO, hip abductors. Shoulder: rotator cuff, lower traps. Lower back: glutes, core, hip mobility." },
      { id: 7, title: "Return-to-sport framework", desc: "After any injury: restore ROM → restore strength → restore function → restore sport specificity. In that order." },
    ],
  },

  // ── BEST PRACTICES ────────────────────────────────────────────────────────

  "recovery-techniques": {
    title: "Recovery Techniques",
    desc: "Best practices for active and passive recovery",
    tasks: [
      { id: 1, title: "Understand active vs passive recovery", desc: "Active: low-intensity movement that increases blood flow. Passive: complete rest. Know when each is appropriate." },
      { id: 2, title: "Cold water immersion protocol", desc: "10–15°C water, 10–15 minutes, 3–4 hours post-training. Most effective for acute soreness and inflammation." },
      { id: 3, title: "Full-body foam rolling routine", desc: "Quads, hamstrings, glutes, upper back, lats, calves. 60 seconds per area. No rolling over joints." },
      { id: 4, title: "Compression and elevation techniques", desc: "Compression garments post-exercise reduce DOMS. Elevate legs above heart for 10–15 min post-run." },
      { id: 5, title: "Massage and trigger point therapy", desc: "Weekly sports massage for heavy training periods. Daily lacrosse ball trigger point work for chronic areas." },
      { id: 6, title: "Sleep and mental recovery", desc: "Sleep is the highest leverage recovery tool. HRV biofeedback, meditation, and parasympathetic activation." },
      { id: 7, title: "Periodize your recovery", desc: "Match recovery investment to training load. Light week = active recovery. Intense block = passive emphasis." },
    ],
  },

  "nutrition-strategy": {
    title: "Nutrition Strategy",
    desc: "Best practices for sports nutrition and meal timing",
    tasks: [
      { id: 1, title: "Understand nutrition periodization", desc: "Match calories and macros to your training week. More on hard days, less on easy days or rest days." },
      { id: 2, title: "Pre-training meal optimization", desc: "3–4 hours before: high carb, moderate protein, low fat, low fiber. 60 min before: small carb + protein snack." },
      { id: 3, title: "Intra-workout nutrition (when needed)", desc: "Sessions under 60 min: water only. Over 90 min: 30–60g carbs per hour (gel, banana, sports drink)." },
      { id: 4, title: "Post-workout nutrition window", desc: "20–40g fast-digesting protein + simple carbs within 2 hours. The window is real but not as urgent as once thought." },
      { id: 5, title: "Competition day fueling strategy", desc: "Familiar foods only — never test new foods race day. Carb load 48 hours before events over 90 minutes." },
      { id: 6, title: "Evidence-based weight management", desc: "Slow deficit (300–500 cal) to preserve performance and muscle. Never diet during peak training blocks." },
      { id: 7, title: "Anti-inflammatory food choices", desc: "Omega-3s (fatty fish, walnuts), polyphenols (berries, dark chocolate), tart cherry, turmeric. Food is medicine." },
    ],
  },

  "training-programming": {
    title: "Training Programming",
    desc: "Best practices for periodization and program design",
    tasks: [
      { id: 1, title: "Understand periodization models", desc: "Linear (beginner), undulating (intermediate), block (advanced). Choose based on your training age." },
      { id: 2, title: "Exercise selection principles", desc: "Compounds first (most neural demand), then accessories. Train movements, not muscles." },
      { id: 3, title: "Volume and intensity management", desc: "MEV (minimum effective volume), MV (maintenance volume), MAV (max adaptive volume). Train in MAV range." },
      { id: 4, title: "Program your deloads", desc: "Every 4–8 weeks: cut volume 40–50%, maintain intensity. Deloads are not optional — they're when growth happens." },
      { id: 5, title: "Conjugate and concurrent methods", desc: "Westside Barbell conjugate: max effort and dynamic effort days. Concurrent: training multiple qualities at once." },
      { id: 6, title: "Advanced programming techniques", desc: "Cluster sets, rest-pause, myo-reps, blood flow restriction. Tools for advanced lifters who need new stimuli." },
      { id: 7, title: "Systematic program review", desc: "Monthly: check progressive overload. Every 8 weeks: reassess goals and program structure. Adjust based on results." },
    ],
  },

  "sleep-wellness": {
    title: "Sleep & Wellness",
    desc: "Best practices for sleep quality and recovery",
    tasks: [
      { id: 1, title: "Understand sleep architecture", desc: "REM and deep sleep cycles, what each phase does, and why you need 4–5 complete 90-min cycles per night." },
      { id: 2, title: "Optimize your sleep environment", desc: "65–68°F (18–20°C), total darkness (blackout curtains), white noise, and no electronics in the bedroom." },
      { id: 3, title: "Align with your circadian rhythm", desc: "Morning sunlight within 30 min of waking. Avoid bright light after sunset. Set consistent sleep/wake times." },
      { id: 4, title: "Build a pre-sleep routine", desc: "60 min wind-down: no screens, dimmed lights, reading, stretching, or journaling. No alcohol within 3 hours." },
      { id: 5, title: "Manage training stress and overreaching", desc: "Recognize signs: elevated resting HR, poor mood, declining performance. These signal need for rest, not more work." },
      { id: 6, title: "Evidence-based sleep supplements", desc: "Magnesium glycinate (300–400mg), melatonin (0.5–1mg, not 10mg), glycine (3g). L-theanine for relaxation." },
      { id: 7, title: "Track recovery and adaptation", desc: "Resting HR, HRV, sleep score, mood, and performance. Use data to make decisions about training load." },
    ],
  },
};
