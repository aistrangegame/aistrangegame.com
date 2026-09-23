# Therapy-lake pages — review closed

**Closed 2026-09-23 by Ashrey's ruling (via Claude Chat).**
- The 280 pages below are approved, now that each carries the care line. So are the 38 pages from PR #24, which Ashrey reviewed and approved.
- The care line is added by the generator (`add_care` in `gen_v2.py`) to every therapy-lake page, never by hand. It sits on a quiet final step: "This is a teaching, not treatment. If you're struggling, a doctor or therapist can help. If you're in danger right now, call your local emergency number or a crisis line (in the US, call or text 988)."
- Review is now automatic. `tools/therapy_gate.py` in the engine repo fails any therapy-lake page that:
  - lacks the care line;
  - makes a cure or guarantee promise;
  - gives a medication instruction;
  - diagnoses the reader;
  - advises skipping professional care;
  - mentions self-harm or suicide without its own crisis pointer;
  - suggests ice, rubber bands or pain as a way to cope.
- Therapy pages that pass merge like any other wave. There are no more held PRs.

The list stays as the record of what was live when the review closed.

## Teachings (132)

| ok | page | register topic | note |
|---|---|---|---|
| ☑ | [A Growth Mindset](https://aistrangegame.com/teachings/skill-28-a-growth-mindset.html) | Skill #28 A Growth Mindset |  |
| ☑ | [A Strengths-Based Approach](https://aistrangegame.com/teachings/15-a-strengths-based-approach.html) | 15. A Strengths-Based Approach |  |
| ☑ | [A Systemic View of Mental Illness](https://aistrangegame.com/teachings/3-a-systemic-approach-to-treating-mental-illness.html) | 3. A Systemic Approach to Treating Mental Illness |  |
| ☑ | [Acting on Your Values, Not Their Outcomes](https://aistrangegame.com/teachings/11-acting-on-your-values-not-their-outcomes.html) | 11. Acting on Your Values, Not Their Outcomes |  |
| ☑ | [Advocating in an Effective Way](https://aistrangegame.com/teachings/12-advocating-in-an-effective-way.html) | 12. Advocating in an Effective Way |  |
| ☑ | [An Abundant Mindset](https://aistrangegame.com/teachings/4-1-an-abundant-mindset.html) | 4.1 An Abundant Mindset |  |
| ☑ | [An Introduction to Coping Skills](https://aistrangegame.com/teachings/an-introduction-to-coping-skills.html) | An Introduction to Coping Skills |  |
| ☑ | [An Introduction to Loving Boundaries](https://aistrangegame.com/teachings/7-an-introduction-to-loving-boundaries.html) | 7. An Introduction to Loving Boundaries |  |
| ☑ | [An Introduction to Self-Care](https://aistrangegame.com/teachings/introduction-to-self-care.html) | Introduction to Self-Care |  |
| ☑ | [Asking Good Questions](https://aistrangegame.com/teachings/5-asking-good-questions.html) | 5. Asking Good Questions |  |
| ☑ | [Being Right vs Being Helpful](https://aistrangegame.com/teachings/13-being-right-vs-being-helpful.html) | 13. Being Right vs Being Helpful |  |
| ☑ | [Black and White Thinking](https://aistrangegame.com/teachings/1-7-bonus-change-how-you-think-black-and-white-thinking.html) | 1.7 Bonus- Change How you Think- Black and White Thinking |  |
| ☑ | [Building Your Support Network](https://aistrangegame.com/teachings/bonus-content-connection-building-your-support-network.html) | Bonus Content: Connection- Building Your Support Network |  |
| ☑ | [Catastrophizing](https://aistrangegame.com/teachings/1-6-bonus-example-of-changing-how-you-think-catastrophizing.html) | 1.6 Bonus- Example of Changing How You Think- Catastrophizing |  |
| ☑ | [Clean Pain and Dirty Pain](https://aistrangegame.com/teachings/skill-4-clean-pain-vs-dirty-pain-how-we-create-our-own-suffering.html) | Skill #4: Clean Pain vs Dirty Pain: How We Create Our Own Suffering |  |
| ☑ | [Cognitive Dissonance](https://aistrangegame.com/teachings/skills-22-cognitive-dissonance.html) | Skills #22 Cognitive Dissonance |  |
| ☑ | [Common Thinking Traps](https://aistrangegame.com/teachings/skill-18-cognitive-distortions.html) | Skill #18 Cognitive Distortions |  |
| ☑ | [Coping Skills and Crisis Skills](https://aistrangegame.com/teachings/skill-13-coping-skills-and-crisis-skills.html) | Skill #13: Coping Skills and Crisis Skills |  |
| ☑ | [Creating a Sensory Soothing Toolkit](https://aistrangegame.com/teachings/3-6-creating-your-sensory-soothing-toolkit.html) | 3.6 Creating your Sensory Soothing Toolkit |  |
| ☑ | [Creating Connection](https://aistrangegame.com/teachings/10-1-creating-connection.html) | 10.1 Creating Connection |  |
| ☑ | [Creating Emotional Safety](https://aistrangegame.com/teachings/3-creating-emotional-safety.html) | 3. Creating Emotional Safety |  |
| ☑ | [Creating Sustainable Change](https://aistrangegame.com/teachings/skill-30-creating-sustainable-change.html) | Skill #30 Creating Sustainable Change |  |
| ☑ | [Describe It, Don’t Judge It](https://aistrangegame.com/teachings/skill-2-stop-judging-emotions-learn-to-describe-them-instead.html) | Skill #2: Stop Judging Emotions: Learn to Describe Them Instead |  |
| ☑ | [Distraction Coping Skills](https://aistrangegame.com/teachings/distraction-coping-skills.html) | Distraction Coping Skills |  |
| ☑ | [Emotion Coping Skills](https://aistrangegame.com/teachings/emotion-coping-skills.html) | Emotion Coping Skills |  |
| ☑ | [Empathic Listening](https://aistrangegame.com/teachings/5-empathic-listening.html) | 5. Empathic Listening |  |
| ☑ | [Enmeshment vs Detachment: A Better Way](https://aistrangegame.com/teachings/12-enmeshment-vs-detachment-a-better-way.html) | 12. Enmeshment vs Detachment: A Better Way |  |
| ☑ | [Evidence of Resilience](https://aistrangegame.com/teachings/remind-yourself-that-you-are-resilient.html) | Remind yourself that you are resilient |  |
| ☑ | [Exercise Is Great for Your Brain](https://aistrangegame.com/teachings/3-1-exercise-is-great-for-your-brain.html) | 3.1 Exercise is Great for Your Brain |  |
| ☑ | [Exploring Your Core Fears](https://aistrangegame.com/teachings/bonus-reading-exploring-your-core-fears.html) | Bonus Reading: Exploring your Core Fears |  |
| ☑ | [Extending a Helping Hand](https://aistrangegame.com/teachings/6-extending-a-helping-hand.html) | 6. Extending a Helping Hand |  |
| ☑ | [Feeling Unsettled When You Travel](https://aistrangegame.com/teachings/how-do-i-fix-my-perception-when-i-travel.html) | How do I fix my perception when I travel? |  |
| ☑ | [Feelings Held in the Body](https://aistrangegame.com/teachings/skill-10-how-emotions-get-trapped-in-your-body-and-how-to-release-them.html) | Skill #10: How Emotions Get Trapped in Your Body and How to Release Them |  |
| ☑ | [Fostering Joy by Expressing Appreciation](https://aistrangegame.com/teachings/week-2-fostering-joy-by-expressing-appreciation.html) | Week 2: Fostering Joy by Expressing Appreciation |  |
| ☑ | [Four Ways to Settle an Anxious Nervous System](https://aistrangegame.com/teachings/bonus-video-4-ways-to-turn-off-anxiety-in-your-nervous-system.html) | Bonus Video: 4 Ways to Turn off Anxiety in Your Nervous System |  |
| ☑ | [Getting Into the Growth Zone](https://aistrangegame.com/teachings/6-getting-into-the-growth-zone.html) | 6. Getting Into the Growth Zone |  |
| ☑ | [Getting Through an Anxiety Attack](https://aistrangegame.com/teachings/my-system-for-stopping-anxiety-attacks.html) | My System for Stopping Anxiety Attacks |  |
| ☑ | [Grounding Through the Body](https://aistrangegame.com/teachings/skill-14-grounding-the-body.html) | Skill #14: Grounding the Body |  |
| ☑ | [Having a Thought vs. Buying a Thought](https://aistrangegame.com/teachings/skill-20-cognitive-defusion-having-a-thought-vs-buying-a-thought.html) | Skill #20 Cognitive Defusion-Having a Thought vs. Buying a Thought |  |
| ☑ | [Health Anxiety](https://aistrangegame.com/teachings/how-to-snap-out-of-health-anxiety.html) | How to snap out of Health Anxiety |  |
| ☑ | [Helpful Things to Say](https://aistrangegame.com/teachings/7-helpful-things-to-say.html) | 7. Helpful Things to Say |  |
| ☑ | [Helping Them Access Resources](https://aistrangegame.com/teachings/2-helping-them-access-resources.html) | 2. Helping Them Access Resources |  |
| ☑ | [Helping Them See More Clearly](https://aistrangegame.com/teachings/9-helping-them-see-more-clearly.html) | 9. Helping Them See More Clearly |  |
| ☑ | [Homeostasis](https://aistrangegame.com/teachings/1-get-off-the-teeter-totter-homeostasis-and-polarization.html) | 1. Get off the Teeter-Totter: Homeostasis and Polarization |  |
| ☑ | [Honoring Your Values](https://aistrangegame.com/teachings/skill-26-honoring-your-values.html) | Skill #26 Honoring Your Values |  |
| ☑ | [How Avoidance Numbs You](https://aistrangegame.com/teachings/bonus-video-how-avoidance-makes-you-numb-and-depressed.html) | Bonus Video: How Avoidance Makes You Numb and Depressed |  |
| ☑ | [How Mental Illness Affects Relationships](https://aistrangegame.com/teachings/4-how-mental-illness-affects-relationships.html) | 4. How Mental Illness Affects Relationships |  |
| ☑ | [How Mental Strain Affects Intimacy](https://aistrangegame.com/teachings/understanding-how-mental-illness-impacts-intimacy.html) | Understanding How Mental Illness Impacts Intimacy |  |
| ☑ | [How Relationships Affect Mental Illness](https://aistrangegame.com/teachings/5-how-relationships-affect-mental-illness.html) | 5. How Relationships Affect Mental Illness |  |
| ☑ | [How to Change How You Think](https://aistrangegame.com/teachings/skill-19-how-to-change-how-you-think.html) | Skill #19 How to Change How You Think |  |
| ☑ | [How to Choose a Therapist](https://aistrangegame.com/teachings/8-how-to-choose-a-therapist.html) | 8. How to Choose a Therapist |  |
| ☑ | [How to Find a Great Therapist](https://aistrangegame.com/teachings/how-to-find-a-great-therapist.html) | How to Find a Great Therapist |  |
| ☑ | [How to Process Anxiety](https://aistrangegame.com/teachings/how-to-process-anxiety.html) | How to Process Anxiety |  |
| ☑ | [How to Process Emotions](https://aistrangegame.com/teachings/fight-depression-and-anxiety-with-your-core-values-26-30-how-to-process-emotions.html) | Fight Depression and Anxiety With Your Core Values 26/30 How to Process Emotions |  |
| ☑ | [How to Set Boundaries: Part 1](https://aistrangegame.com/teachings/how-to-set-boundaries-part-1.html) | How to Set Boundaries: Part 1 |  |
| ☑ | [How to Set Boundaries: Part 2](https://aistrangegame.com/teachings/how-to-set-boundaries-part-2.html) | How to Set Boundaries: Part 2 |  |
| ☑ | [How to Use the Emotion Wheel](https://aistrangegame.com/teachings/bonus-video-how-to-use-the-emotion-wheel.html) | Bonus Video: How to Use the Emotion Wheel |  |
| ☑ | [Inviting Them to Be Active](https://aistrangegame.com/teachings/3-inviting-them-to-be-active.html) | 3. Inviting Them to Be Active |  |
| ☑ | [Letting Go of Self-Limiting Labels](https://aistrangegame.com/teachings/skill-27-letting-go-of-self-limiting-labels.html) | Skill #27 Letting go of Self-Limiting Labels |  |
| ☑ | [Living With Health Anxiety Over Time](https://aistrangegame.com/teachings/follow-up-on-health-anxiety.html) | Follow up on Health Anxiety |  |
| ☑ | [Locus of Control](https://aistrangegame.com/teachings/define-locus-of-control-in-a-bit-more-depth.html) | Define locus of control in a bit more depth |  |
| ☑ | [Loosening Emotional Blocks](https://aistrangegame.com/teachings/skill-15-overcoming-emotional-blocks.html) | Skill #15: Overcoming Emotional Blocks |  |
| ☑ | [Making Repairs](https://aistrangegame.com/teachings/introduction-to-week-4-making-repairs.html) | Introduction to Week 4: Making Repairs |  |
| ☑ | [Managing Stress](https://aistrangegame.com/teachings/9-1-managing-stress.html) | 9.1 Managing Stress |  |
| ☑ | [Mental Illness Is Common and Treatable](https://aistrangegame.com/teachings/2-mental-illness-is-common-and-treatable.html) | 2. Mental Illness Is Common and Treatable |  |
| ☑ | [Mindfulness for Beginners](https://aistrangegame.com/teachings/skill-21-mindfulness-for-beginners.html) | Skill #21 Mindfulness for Beginners |  |
| ☑ | [More Skills for Healthy Relationships](https://aistrangegame.com/teachings/more-skills-for-healthy-relationships.html) | More Skills for Healthy Relationships |  |
| ☑ | [More Ways to Settle the Nervous System](https://aistrangegame.com/teachings/2-9-more-ways-to-turn-on-the-parasympathetic-response.html) | 2.9 More Ways to Turn on the Parasympathetic Response |  |
| ☑ | [Name It to Tame It](https://aistrangegame.com/teachings/skill-1-name-it-to-tame-it.html) | Skill #1: Name It to Tame It |  |
| ☑ | [Neuroception](https://aistrangegame.com/teachings/1-5-neuroception-insight-into-your-nervous-system.html) | 1.5 Neuroception: Insight Into Your Nervous System |  |
| ☑ | [Neuroplasticity](https://aistrangegame.com/teachings/1-1-neuroplasticity-change-how-you-think-change-how-you-feel.html) | 1.1 Neuroplasticity- Change How You Think-Change How You Feel |  |
| ☑ | [One Tiny Step at a Time](https://aistrangegame.com/teachings/change-your-life-one-tiny-step-at-a-time.html) | Change Your Life – One Tiny Step at a Time |  |
| ☑ | [Pairing a Feared Cue With Safety](https://aistrangegame.com/teachings/3-5-pairing-safe-triggers.html) | 3.5 Pairing Safe Triggers |  |
| ☑ | [Panic Attacks, Anxiety Attacks, and Panic Disorder](https://aistrangegame.com/teachings/the-difference-between-panic-attacks-anxiety-attacks-and-panic-disorder.html) | The Difference Between Panic Attacks, Anxiety Attacks, and Panic Disorder |  |
| ☑ | [Perceived Danger and Creating Safety](https://aistrangegame.com/teachings/bonus-video-perceived-danger-and-creating-safety.html) | Bonus Video: Perceived Danger and Creating Safety |  |
| ☑ | [Perceived Safety vs. Actual Danger](https://aistrangegame.com/teachings/3-2-perceived-safety-vs-actual-danger.html) | 3.2 Perceived Safety vs. Actual Danger |  |
| ☑ | [Physical Ways to Increase Resilience to Anxiety](https://aistrangegame.com/teachings/bonus-exercise-physical-ways-to-increase-resilience-to-anxiety.html) | Bonus Exercise: Physical Ways to Increase Resilience to Anxiety |  |
| ☑ | [Plain Words for Anxious Moments](https://aistrangegame.com/teachings/words-of-wisdom-to-deal-with-anxiety.html) | Words of wisdom to deal with anxiety |  |
| ☑ | [Primary and Secondary Emotions](https://aistrangegame.com/teachings/skill-7-primary-vs-secondary-emotions.html) | Skill #7: Primary vs Secondary Emotions |  |
| ☑ | [Purpose, Joy, Love, and Growth](https://aistrangegame.com/teachings/skill-25-better-than-happy-purpose-joy-love-and-growth.html) | Skill #25 Better than Happy- Purpose, Joy, Love and Growth |  |
| ☑ | [Reflective Listening](https://aistrangegame.com/teachings/5-reflective-listening.html) | 5. Reflective Listening |  |
| ☑ | [Reframing: Choosing Your Stories](https://aistrangegame.com/teachings/skill-17-reframing-choosing-your-stories.html) | Skill #17 Reframing: Choosing Your Stories |  |
| ☑ | [Regulating Your Nervous System](https://aistrangegame.com/teachings/skill-11-regulating-your-nervous-system.html) | Skill #11: Regulating Your Nervous System |  |
| ☑ | [Relaxation Coping Skills](https://aistrangegame.com/teachings/relaxation-coping-skills.html) | Relaxation Coping Skills |  |
| ☑ | [Self-Compassion](https://aistrangegame.com/teachings/emotion-processing-skills-self-compassion.html) | Emotion Processing Skills: Self-Compassion |  |
| ☑ | [Sensory Coping Skills](https://aistrangegame.com/teachings/sensory-coping-skills.html) | Sensory Coping Skills |  |
| ☑ | [Setting Better Goals](https://aistrangegame.com/teachings/bonus-video-setting-better-goals.html) | Bonus Video: Setting Better Goals |  |
| ☑ | [Shame, Embarrassment, and Guilt](https://aistrangegame.com/teachings/suggestions-for-handling-feelings-of-shame-embarrassment-and-guilt.html) | Suggestions for handling feelings of shame, embarrassment, and guilt. |  |
| ☑ | [Soothing an Anxious Nervous System](https://aistrangegame.com/teachings/9-3-bonus-video-soothing-anxiety-in-the-nervous-system.html) | 9.3 Bonus Video- Soothing Anxiety in the Nervous System |  |
| ☑ | [Stress, Anxiety, and Worry](https://aistrangegame.com/teachings/1-2-stress-anxiety-and-worry-what-s-the-difference-and-why-does-it-matter.html) | 1.2 Stress, Anxiety, and Worry: What's the Difference and Why Does it Matter? |  |
| ☑ | [Strong Emotion and Clear Thinking](https://aistrangegame.com/teachings/skill-9-how-anxiety-and-strong-emotions-impact-your-brain.html) | Skill #9: How Anxiety and Strong Emotions Impact Your Brain |  |
| ☑ | [Switch Addictions and White-Knuckling](https://aistrangegame.com/teachings/4-switch-addictions-and-white-knuckling.html) | 4. Switch Addictions and White-Knuckling |  |
| ☑ | [Taking Care of Your Body](https://aistrangegame.com/teachings/self-care-30-day-plan-to-take-care-of-your-body.html) | Self-Care 30-Day Plan to Take Care of Your Body |  |
| ☑ | [Taking Care of Yourself While You Support Someone](https://aistrangegame.com/teachings/9-taking-care-of-yourself.html) | 9. Taking Care of Yourself |  |
| ☑ | [Teaming Up With Them Against the Illness](https://aistrangegame.com/teachings/8-teaming-up-with-them-against-the-illness.html) | 8. Teaming Up With Them Against the Illness |  |
| ☑ | [The Anxiety Cycle](https://aistrangegame.com/teachings/bonus-video-the-anxiety-cycle-animated-version.html) | Bonus Video: The anxiety cycle - animated version |  |
| ☑ | [The Benefits of Journaling](https://aistrangegame.com/teachings/8-1-the-benefits-of-journaling.html) | 8.1 The Benefits of Journaling |  |
| ☑ | [The Big Picture](https://aistrangegame.com/teachings/skill-24-the-big-picture-creating-the-life-you-want.html) | Skill #24 The Big Picture: Creating the Life you Want |  |
| ☑ | [The Choice: Act, Accept, or Walk Away](https://aistrangegame.com/teachings/skill-31-the-choice-act-accept-or-run-away.html) | Skill #31 The Choice: Act, Accept, or Run Away |  |
| ☑ | [The Fight, Flight, Freeze Response](https://aistrangegame.com/teachings/1-3-the-fight-flight-freeze-response.html) | 1.3 The Fight, Flight, Freeze Response |  |
| ☑ | [The Hidden Reasons You Worry](https://aistrangegame.com/teachings/bonus-video-3-subconscious-reasons-why-you-worry.html) | Bonus Video: 3 Subconscious Reasons Why You Worry |  |
| ☑ | [The Paradox of Change and Acceptance](https://aistrangegame.com/teachings/bonus-video-the-paradox-of-change-and-acceptance.html) | Bonus Video: The Paradox of Change and Acceptance |  |
| ☑ | [The Paradox of Making Them Feel Better](https://aistrangegame.com/teachings/2-the-paradox-of-making-them-feel-better.html) | 2. The Paradox of Making Them Feel Better |  |
| ☑ | [The Problem With Advice](https://aistrangegame.com/teachings/14-the-problem-with-advice.html) | 14. The Problem With Advice |  |
| ☑ | [The Stories You Tell Yourself](https://aistrangegame.com/teachings/skill-23-self-deception.html) | Skill #23 Self- Deception |  |
| ☑ | [The Struggle With Struggle](https://aistrangegame.com/teachings/skill-5-how-avoidance-makes-it-worse-the-struggle-with-struggle.html) | Skill #5: How Avoidance Makes It Worse: The Struggle With Struggle |  |
| ☑ | [The Two Sides of Your Nervous System](https://aistrangegame.com/teachings/1-4-the-two-sides-of-your-nervous-system-sympathetic-and-parasympathetic.html) | 1.4 The Two Sides of Your Nervous System: Sympathetic and Parasympathetic |  |
| ☑ | [Three Good Things](https://aistrangegame.com/teachings/4-2-three-good-things.html) | 4.2 Three Good Things |  |
| ☑ | [Time in Nature and the Stressed Mind](https://aistrangegame.com/teachings/9-2-how-nature-changes-your-brain.html) | 9.2 How Nature Changes Your Brain |  |
| ☑ | [Tiny Changes, Big Results](https://aistrangegame.com/teachings/1-3-tiny-changes-big-results-pick-the-low-hanging-fruit.html) | 1.3 Tiny Changes Big Results- Pick the Low-Hanging Fruit |  |
| ☑ | [Turning on the Parasympathetic Response](https://aistrangegame.com/teachings/2-1-turning-on-the-parasympathetic-response.html) | 2.1 Turning on the Parasympathetic Response |  |
| ☑ | [Unconditional Positive Regard](https://aistrangegame.com/teachings/1-unconditional-positive-regard.html) | 1. Unconditional Positive Regard |  |
| ☑ | [Understanding Your Nervous System](https://aistrangegame.com/teachings/1-1-introduction-to-understanding-your-nervous-system.html) | 1.1 Introduction to Understanding Your Nervous System |  |
| ☑ | [Using the Right Skill for Your State of Mind](https://aistrangegame.com/teachings/using-a-mental-skill-according-to-my-state-of-mind.html) | Using a mental skill according to my state of mind |  |
| ☑ | [Walking and the Hippocampus](https://aistrangegame.com/teachings/growing-a-bigger-brain-is-a-walk-in-the-park.html) | Growing A Bigger Brain Is A Walk In The Park |  |
| ☑ | [What Anger Covers](https://aistrangegame.com/teachings/is-anger-the-only-emotion-that-covers-up-other-emotions.html) | Is anger the only emotion that covers up other emotions? |  |
| ☑ | [What Causes the Panic Attack Cycle](https://aistrangegame.com/teachings/what-causes-the-panic-attack-cycle.html) | What Causes The Panic Attack Cycle |  |
| ☑ | [What Emotions Are For](https://aistrangegame.com/teachings/skill-3-the-function-of-emotions.html) | Skill #3: The Function of Emotions |  |
| ☑ | [What If They Won't Talk](https://aistrangegame.com/teachings/11-what-if-they-won-t-talk.html) | 11. What If They Won't Talk? |  |
| ☑ | [What Is Emotion Processing?](https://aistrangegame.com/teachings/what-is-emotion-processing.html) | What Is Emotion Processing? |  |
| ☑ | [When Anxiety Takes Over](https://aistrangegame.com/teachings/my-anxiety-ruins-everything.html) | My anxiety ruins everything |  |
| ☑ | [When Everything Is Too Much](https://aistrangegame.com/teachings/an-antidote-to-overwhelm.html) | An Antidote to Overwhelm |  |
| ☑ | [When They Won't Get Help](https://aistrangegame.com/teachings/9-what-to-do-if-they-won-t-get-help.html) | 9. What to Do If They Won't Get Help |  |
| ☑ | [When to See Someone](https://aistrangegame.com/teachings/10-getting-individualized-help-maybe-you-should-see-someone.html) | 10. Getting Individualized Help: Maybe You Should See Someone |  |
| ☑ | [Where Feelings Show Up in the Body](https://aistrangegame.com/teachings/skill-8-the-mind-body-connection-with-emotions.html) | Skill #8: The Mind-Body Connection With Emotions |  |
| ☑ | [White Coat Syndrome](https://aistrangegame.com/teachings/suggestions-for-white-coat-syndrome.html) | Suggestions for white coat syndrome |  |
| ☑ | [Why Boundaries Feel So Hard](https://aistrangegame.com/teachings/why-many-people-don-t-set-boundaries.html) | Why Many People Don't Set Boundaries |  |
| ☑ | [Why You're Trying to Help](https://aistrangegame.com/teachings/6-why-you-re-trying-to-help-is-it-helpful.html) | 6. Why You're Trying to Help: Is It Helpful? |  |
| ☑ | [Willingly Out of Breath](https://aistrangegame.com/teachings/bonus-video-willingly-out-of-breath.html) | Bonus Video: Willingly Out of Breath |  |
| ☑ | [Willingness](https://aistrangegame.com/teachings/skill-6-willingness-the-emotional-superpower.html) | Skill #6: Willingness: The Emotional Superpower |  |
| ☑ | [Working With the Fear Response](https://aistrangegame.com/teachings/bonus-video-turn-off-the-fear-response.html) | Bonus Video: Turn Off the Fear Response |  |
| ☑ | [“I Feel” Statements](https://aistrangegame.com/teachings/bonus-video-i-feel-statements-from-the-relationships-skills-course.html) | Bonus Video: "I feel..." Statements From the Relationships Skills Course |  |

## Practice cards (109)

| ok | page | register topic | note |
|---|---|---|---|
| ☑ | [2-Minute Stress Release](https://aistrangegame.com/learning/practice/2-minute-stress-release.html) | 2-Minute Stress Release |  |
| ☑ | [A Growth Mindset](https://aistrangegame.com/learning/practice/skill-28-a-growth-mindset.html) | Skill #28 A Growth Mindset |  |
| ☑ | [A Sensory Soothing Kit](https://aistrangegame.com/learning/practice/3-6-creating-your-sensory-soothing-toolkit.html) | 3.6 Creating your Sensory Soothing Toolkit |  |
| ☑ | [A Slow Settling Sequence](https://aistrangegame.com/learning/practice/grounding-exercise-my-new-favorite-vagal-exercise.html) | Grounding Exercise: My new Favorite Vagal Exercise |  |
| ☑ | [A Walk, and a Slightly Larger Hippocampus](https://aistrangegame.com/learning/practice/growing-a-bigger-brain-is-a-walk-in-the-park.html) | Growing A Bigger Brain Is A Walk In The Park |  |
| ☑ | [A Warm Shower](https://aistrangegame.com/learning/practice/sensory-coping-activity-hot-shower.html) | Sensory Coping Activity: Hot Shower |  |
| ☑ | [Act, Accept, or Run Away](https://aistrangegame.com/learning/practice/skill-31-the-choice-act-accept-or-run-away.html) | Skill #31 The Choice: Act, Accept, or Run Away |  |
| ☑ | [Acting on Your Values, Not Their Outcomes](https://aistrangegame.com/learning/practice/11-acting-on-your-values-not-their-outcomes.html) | 11. Acting on Your Values, Not Their Outcomes |  |
| ☑ | [An Antidote to Overwhelm](https://aistrangegame.com/learning/practice/an-antidote-to-overwhelm.html) | An Antidote to Overwhelm |  |
| ☑ | [An Introduction to Coping Skills](https://aistrangegame.com/learning/practice/an-introduction-to-coping-skills.html) | An Introduction to Coping Skills |  |
| ☑ | [Anxiety and the Brain](https://aistrangegame.com/learning/practice/skill-9-how-anxiety-and-strong-emotions-impact-your-brain.html) | Skill #9: How Anxiety and Strong Emotions Impact Your Brain |  |
| ☑ | [Appreciation and Joy](https://aistrangegame.com/learning/practice/week-2-fostering-joy-by-expressing-appreciation.html) | Week 2: Fostering Joy by Expressing Appreciation |  |
| ☑ | [Avoidance and the Struggle](https://aistrangegame.com/learning/practice/skill-5-how-avoidance-makes-it-worse-the-struggle-with-struggle.html) | Skill #5: How Avoidance Makes It Worse: The Struggle With Struggle |  |
| ☑ | [Belly Breathing](https://aistrangegame.com/learning/practice/2-2-grounding-exercise-belly-breathing.html) | 2.2 Grounding Exercise: Belly Breathing |  |
| ☑ | [Black-and-White Thinking](https://aistrangegame.com/learning/practice/1-7-bonus-change-how-you-think-black-and-white-thinking.html) | 1.7 Bonus- Change How you Think- Black and White Thinking |  |
| ☑ | [Body Scan](https://aistrangegame.com/learning/practice/2-8-body-scan-exercise.html) | 2.8 Body Scan Exercise |  |
| ☑ | [Breath Counting](https://aistrangegame.com/learning/practice/3-7-breath-counting.html) | 3.7 Breath Counting |  |
| ☑ | [Building Connection](https://aistrangegame.com/learning/practice/week-3-building-connection.html) | Week 3: Building Connection |  |
| ☑ | [Building Resiliency Through Connection](https://aistrangegame.com/learning/practice/building-resiliency-through-connection.html) | Building Resiliency Through Connection |  |
| ☑ | [Building Your Support Network](https://aistrangegame.com/learning/practice/bonus-content-connection-building-your-support-network.html) | Bonus Content: Connection- Building Your Support Network |  |
| ☑ | [Clean Pain and Dirty Pain](https://aistrangegame.com/learning/practice/skill-4-clean-pain-vs-dirty-pain-how-we-create-our-own-suffering.html) | Skill #4: Clean Pain vs Dirty Pain: How We Create Our Own Suffering |  |
| ☑ | [Cognitive Behavioral Therapy for Insomnia](https://aistrangegame.com/learning/practice/5-4-cognitive-behavioral-therapy-for-insomnia.html) | 5.4 Cognitive Behavioral Therapy for Insomnia |  |
| ☑ | [Cognitive Defusion](https://aistrangegame.com/learning/practice/skill-20-cognitive-defusion-having-a-thought-vs-buying-a-thought.html) | Skill #20 Cognitive Defusion-Having a Thought vs. Buying a Thought |  |
| ☑ | [Cognitive Dissonance](https://aistrangegame.com/learning/practice/skills-22-cognitive-dissonance.html) | Skills #22 Cognitive Dissonance |  |
| ☑ | [Cognitive Distortions](https://aistrangegame.com/learning/practice/skill-18-cognitive-distortions.html) | Skill #18 Cognitive Distortions |  |
| ☑ | [Coping Skills and Crisis Skills](https://aistrangegame.com/learning/practice/skill-13-coping-skills-and-crisis-skills.html) | Skill #13: Coping Skills and Crisis Skills |  |
| ☑ | [Describing Emotions Instead of Judging Them](https://aistrangegame.com/learning/practice/skill-2-stop-judging-emotions-learn-to-describe-them-instead.html) | Skill #2: Stop Judging Emotions: Learn to Describe Them Instead |  |
| ☑ | [Distraction Coping Skills](https://aistrangegame.com/learning/practice/distraction-coping-skills.html) | Distraction Coping Skills |  |
| ☑ | [Emotion Processing Skills](https://aistrangegame.com/learning/practice/emotion-processing-skills.html) | Emotion Processing Skills |  |
| ☑ | [Emotions and the Body](https://aistrangegame.com/learning/practice/skill-10-how-emotions-get-trapped-in-your-body-and-how-to-release-them.html) | Skill #10: How Emotions Get Trapped in Your Body and How to Release Them |  |
| ☑ | [Exercise and the Brain](https://aistrangegame.com/learning/practice/3-1-exercise-is-great-for-your-brain.html) | 3.1 Exercise is Great for Your Brain |  |
| ☑ | [Exploring Your Core Fears](https://aistrangegame.com/learning/practice/bonus-reading-exploring-your-core-fears.html) | Bonus Reading: Exploring your Core Fears |  |
| ☑ | [Extending a Helping Hand](https://aistrangegame.com/learning/practice/6-extending-a-helping-hand.html) | 6. Extending a Helping Hand |  |
| ☑ | [Four Ways to Calm Your Nervous System](https://aistrangegame.com/learning/practice/bonus-video-4-ways-to-turn-off-anxiety-in-your-nervous-system.html) | Bonus Video: 4 Ways to Turn off Anxiety in Your Nervous System |  |
| ☑ | [Getting Individualized Help](https://aistrangegame.com/learning/practice/10-getting-individualized-help-maybe-you-should-see-someone.html) | 10. Getting Individualized Help: Maybe You Should See Someone |  |
| ☑ | [Getting Into the Growth Zone](https://aistrangegame.com/learning/practice/6-getting-into-the-growth-zone.html) | 6. Getting Into the Growth Zone |  |
| ☑ | [Grounding the Body](https://aistrangegame.com/learning/practice/skill-14-grounding-the-body.html) | Skill #14: Grounding the Body |  |
| ☑ | [Grounding With the 5 Senses](https://aistrangegame.com/learning/practice/grounding-with-the-5-senses.html) | Grounding With the 5 Senses |  |
| ☑ | [Homeostasis and Polarization](https://aistrangegame.com/learning/practice/1-get-off-the-teeter-totter-homeostasis-and-polarization.html) | 1. Get off the Teeter-Totter: Homeostasis and Polarization |  |
| ☑ | [Honoring Your Values](https://aistrangegame.com/learning/practice/skill-26-honoring-your-values.html) | Skill #26 Honoring Your Values |  |
| ☑ | [How Avoidance Makes You Numb and Depressed](https://aistrangegame.com/learning/practice/bonus-video-how-avoidance-makes-you-numb-and-depressed.html) | Bonus Video: How Avoidance Makes You Numb and Depressed |  |
| ☑ | [How to Change How You Think](https://aistrangegame.com/learning/practice/skill-19-how-to-change-how-you-think.html) | Skill #19 How to Change How You Think |  |
| ☑ | [How to Fall Asleep With Insomnia](https://aistrangegame.com/learning/practice/5-5-bonus-video-how-to-fall-asleep-with-insomnia.html) | 5.5 Bonus Video: How to Fall Asleep With Insomnia |  |
| ☑ | [How to Process Anxiety](https://aistrangegame.com/learning/practice/how-to-process-anxiety.html) | How to Process Anxiety |  |
| ☑ | [How to Use the Emotion Wheel](https://aistrangegame.com/learning/practice/bonus-video-how-to-use-the-emotion-wheel.html) | Bonus Video: How to Use the Emotion Wheel |  |
| ☑ | [I-Statements](https://aistrangegame.com/learning/practice/bonus-video-i-feel-statements-from-the-relationships-skills-course.html) | Bonus Video: "I feel..." Statements From the Relationships Skills Course |  |
| ☑ | [Introduction to Self-Care](https://aistrangegame.com/learning/practice/introduction-to-self-care.html) | Introduction to Self-Care |  |
| ☑ | [Inviting Them to Be Active](https://aistrangegame.com/learning/practice/3-inviting-them-to-be-active.html) | 3. Inviting Them to Be Active |  |
| ☑ | [Is Anger the Only Emotion That Covers Up Other Emotions?](https://aistrangegame.com/learning/practice/is-anger-the-only-emotion-that-covers-up-other-emotions.html) | Is anger the only emotion that covers up other emotions? |  |
| ☑ | [Is Your Help Actually Helping?](https://aistrangegame.com/learning/practice/6-why-you-re-trying-to-help-is-it-helpful.html) | 6. Why You're Trying to Help: Is It Helpful? |  |
| ☑ | [Journaling](https://aistrangegame.com/learning/practice/8-1-the-benefits-of-journaling.html) | 8.1 The Benefits of Journaling |  |
| ☑ | [Leaves on a Stream](https://aistrangegame.com/learning/practice/6-6-mindful-exercise-leaves-on-a-stream.html) | 6.6 Mindful Exercise: Leaves on a Stream |  |
| ☑ | [Letting Go of Self-Limiting Labels](https://aistrangegame.com/learning/practice/skill-27-letting-go-of-self-limiting-labels.html) | Skill #27 Letting go of Self-Limiting Labels |  |
| ☑ | [Locus of Control, in More Depth](https://aistrangegame.com/learning/practice/define-locus-of-control-in-a-bit-more-depth.html) | Define locus of control in a bit more depth |  |
| ☑ | [Matching a Skill to Your State of Mind](https://aistrangegame.com/learning/practice/using-a-mental-skill-according-to-my-state-of-mind.html) | Using a mental skill according to my state of mind |  |
| ☑ | [Mindful Breathing](https://aistrangegame.com/learning/practice/6-3-mindful-breathing.html) | 6.3 Mindful Breathing |  |
| ☑ | [Mindful Eating](https://aistrangegame.com/learning/practice/6-2-mindful-eating-with-parkview-health.html) | 6.2 Mindful Eating- with Parkview Health |  |
| ☑ | [More Skills for Healthy Relationships](https://aistrangegame.com/learning/practice/more-skills-for-healthy-relationships.html) | More Skills for Healthy Relationships |  |
| ☑ | [More Ways to Settle the Nervous System](https://aistrangegame.com/learning/practice/2-9-more-ways-to-turn-on-the-parasympathetic-response.html) | 2.9 More Ways to Turn on the Parasympathetic Response |  |
| ☑ | [Name It to Tame It](https://aistrangegame.com/learning/practice/skill-1-name-it-to-tame-it.html) | Skill #1: Name It to Tame It |  |
| ☑ | [Nature and Attention](https://aistrangegame.com/learning/practice/9-2-how-nature-changes-your-brain.html) | 9.2 How Nature Changes Your Brain |  |
| ☑ | [Neuroception](https://aistrangegame.com/learning/practice/1-5-neuroception-insight-into-your-nervous-system.html) | 1.5 Neuroception: Insight Into Your Nervous System |  |
| ☑ | [Neuroplasticity](https://aistrangegame.com/learning/practice/1-1-neuroplasticity-change-how-you-think-change-how-you-feel.html) | 1.1 Neuroplasticity- Change How You Think-Change How You Feel |  |
| ☑ | [One Tiny Step at a Time](https://aistrangegame.com/learning/practice/change-your-life-one-tiny-step-at-a-time.html) | Change Your Life – One Tiny Step at a Time |  |
| ☑ | [Overcoming Emotional Blocks](https://aistrangegame.com/learning/practice/skill-15-overcoming-emotional-blocks.html) | Skill #15: Overcoming Emotional Blocks |  |
| ☑ | [Pairing Safe Triggers](https://aistrangegame.com/learning/practice/3-5-pairing-safe-triggers.html) | 3.5 Pairing Safe Triggers |  |
| ☑ | [Perceived Safety vs. Actual Danger](https://aistrangegame.com/learning/practice/3-2-perceived-safety-vs-actual-danger.html) | 3.2 Perceived Safety vs. Actual Danger |  |
| ☑ | [Physical Resilience to Anxiety](https://aistrangegame.com/learning/practice/bonus-exercise-physical-ways-to-increase-resilience-to-anxiety.html) | Bonus Exercise: Physical Ways to Increase Resilience to Anxiety |  |
| ☑ | [Primary vs. Secondary Emotions](https://aistrangegame.com/learning/practice/skill-7-primary-vs-secondary-emotions.html) | Skill #7: Primary vs Secondary Emotions |  |
| ☑ | [Processing an Emotion](https://aistrangegame.com/learning/practice/fight-depression-and-anxiety-with-your-core-values-26-30-how-to-process-emotions.html) | Fight Depression and Anxiety With Your Core Values 26/30 How to Process Emotions |  |
| ☑ | [Progressive Muscle Relaxation](https://aistrangegame.com/learning/practice/progressive-muscle-relaxation.html) | Progressive Muscle Relaxation |  |
| ☑ | [Purpose, Joy, Love, and Growth](https://aistrangegame.com/learning/practice/skill-25-better-than-happy-purpose-joy-love-and-growth.html) | Skill #25 Better than Happy- Purpose, Joy, Love and Growth |  |
| ☑ | [Reframing: Choosing Your Stories](https://aistrangegame.com/learning/practice/skill-17-reframing-choosing-your-stories.html) | Skill #17 Reframing: Choosing Your Stories |  |
| ☑ | [Regulating Your Nervous System](https://aistrangegame.com/learning/practice/skill-11-regulating-your-nervous-system.html) | Skill #11: Regulating Your Nervous System |  |
| ☑ | [Relaxation Coping Skills](https://aistrangegame.com/learning/practice/relaxation-coping-skills.html) | Relaxation Coping Skills |  |
| ☑ | [Remind Yourself That You Are Resilient](https://aistrangegame.com/learning/practice/remind-yourself-that-you-are-resilient.html) | Remind yourself that you are resilient |  |
| ☑ | [Self-Compassion as a Source of Change](https://aistrangegame.com/learning/practice/skill-29-self-compassion-as-the-source-of-change.html) | Skill #29 Self-Compassion as the Source of Change |  |
| ☑ | [Self-Compassion for a Hard Feeling](https://aistrangegame.com/learning/practice/emotion-processing-skills-self-compassion.html) | Emotion Processing Skills: Self-Compassion |  |
| ☑ | [Self-Deception](https://aistrangegame.com/learning/practice/skill-23-self-deception.html) | Skill #23 Self- Deception |  |
| ☑ | [Setting Better Goals](https://aistrangegame.com/learning/practice/bonus-video-setting-better-goals.html) | Bonus Video: Setting Better Goals |  |
| ☑ | [Settling the Fear Response](https://aistrangegame.com/learning/practice/bonus-video-turn-off-the-fear-response.html) | Bonus Video: Turn Off the Fear Response |  |
| ☑ | [Signs You're Not Getting Enough Sleep](https://aistrangegame.com/learning/practice/5-2-signs-you-re-not-getting-enough-sleep.html) | 5.2 Signs you're not getting enough sleep |  |
| ☑ | [Sleep Hygiene](https://aistrangegame.com/learning/practice/sleep-hygiene.html) | Sleep Hygiene |  |
| ☑ | [Sleep is Vital to Mental Health](https://aistrangegame.com/learning/practice/5-1-sleep-is-vital-to-mental-health.html) | 5.1 Sleep is Vital to Mental Health |  |
| ☑ | [Softening the Eyes](https://aistrangegame.com/learning/practice/2-5-grounding-exercise-peripheral-vision-and-softening-the-eyes.html) | 2.5 Grounding Exercise: Peripheral Vision and Softening the Eyes |  |
| ☑ | [Soothing Anxiety in the Nervous System](https://aistrangegame.com/learning/practice/9-3-bonus-video-soothing-anxiety-in-the-nervous-system.html) | 9.3 Bonus Video- Soothing Anxiety in the Nervous System |  |
| ☑ | [Stress, Anxiety, and Worry](https://aistrangegame.com/learning/practice/1-2-stress-anxiety-and-worry-what-s-the-difference-and-why-does-it-matter.html) | 1.2 Stress, Anxiety, and Worry: What's the Difference and Why Does it Matter? |  |
| ☑ | [Supporting the Parasympathetic Response](https://aistrangegame.com/learning/practice/2-1-turning-on-the-parasympathetic-response.html) | 2.1 Turning on the Parasympathetic Response |  |
| ☑ | [Taking Care of Your Body](https://aistrangegame.com/learning/practice/self-care-30-day-plan-to-take-care-of-your-body.html) | Self-Care 30-Day Plan to Take Care of Your Body |  |
| ☑ | [Taking Care of Yourself](https://aistrangegame.com/learning/practice/9-taking-care-of-yourself.html) | 9. Taking Care of Yourself |  |
| ☑ | [Tapping the Points](https://aistrangegame.com/learning/practice/1-8-grounding-exercise-tapping.html) | 1.8 Grounding Exercise: Tapping |  |
| ☑ | [The Anxiety Cycle](https://aistrangegame.com/learning/practice/bonus-video-the-anxiety-cycle-animated-version.html) | Bonus Video: The anxiety cycle - animated version |  |
| ☑ | [The Breathing Space](https://aistrangegame.com/learning/practice/3-minute-mindful-breathing.html) | 3 Minute Mindful Breathing |  |
| ☑ | [The Deliberate Yawn](https://aistrangegame.com/learning/practice/2-3-grounding-exercise-the-yawn.html) | 2.3 Grounding Exercise: The Yawn |  |
| ☑ | [The Fight, Flight, Freeze Response](https://aistrangegame.com/learning/practice/1-3-the-fight-flight-freeze-response.html) | 1.3 The Fight, Flight, Freeze Response |  |
| ☑ | [The Function of Emotions](https://aistrangegame.com/learning/practice/skill-3-the-function-of-emotions.html) | Skill #3: The Function of Emotions |  |
| ☑ | [The Mind-Body Connection With Emotions](https://aistrangegame.com/learning/practice/skill-8-the-mind-body-connection-with-emotions.html) | Skill #8: The Mind-Body Connection With Emotions |  |
| ☑ | [The Paradox of Change and Acceptance](https://aistrangegame.com/learning/practice/bonus-video-the-paradox-of-change-and-acceptance.html) | Bonus Video: The Paradox of Change and Acceptance |  |
| ☑ | [The Paradox of Making Them Feel Better](https://aistrangegame.com/learning/practice/2-the-paradox-of-making-them-feel-better.html) | 2. The Paradox of Making Them Feel Better |  |
| ☑ | [The Unsettled Feeling of Travel](https://aistrangegame.com/learning/practice/how-do-i-fix-my-perception-when-i-travel.html) | How do I fix my perception when I travel? |  |
| ☑ | [Tiny Changes, Big Results](https://aistrangegame.com/learning/practice/1-3-tiny-changes-big-results-pick-the-low-hanging-fruit.html) | 1.3 Tiny Changes Big Results- Pick the Low-Hanging Fruit |  |
| ☑ | [Unconditional Positive Regard](https://aistrangegame.com/learning/practice/1-unconditional-positive-regard.html) | 1. Unconditional Positive Regard |  |
| ☑ | [Understanding Your Nervous System](https://aistrangegame.com/learning/practice/1-1-introduction-to-understanding-your-nervous-system.html) | 1.1 Introduction to Understanding Your Nervous System |  |
| ☑ | [What Is Emotion Processing?](https://aistrangegame.com/learning/practice/what-is-emotion-processing.html) | What Is Emotion Processing? |  |
| ☑ | [When Anxiety Ruins Everything](https://aistrangegame.com/learning/practice/my-anxiety-ruins-everything.html) | My anxiety ruins everything |  |
| ☑ | [Why Worry Sticks Around](https://aistrangegame.com/learning/practice/bonus-video-3-subconscious-reasons-why-you-worry.html) | Bonus Video: 3 Subconscious Reasons Why You Worry |  |
| ☑ | [Willingness as a Skill](https://aistrangegame.com/learning/practice/skill-6-willingness-the-emotional-superpower.html) | Skill #6: Willingness: The Emotional Superpower |  |
| ☑ | [Words of Wisdom to Deal With Anxiety](https://aistrangegame.com/learning/practice/words-of-wisdom-to-deal-with-anxiety.html) | Words of wisdom to deal with anxiety |  |
| ☑ | [Your Two Nervous Systems](https://aistrangegame.com/learning/practice/1-4-the-two-sides-of-your-nervous-system-sympathetic-and-parasympathetic.html) | 1.4 The Two Sides of Your Nervous System: Sympathetic and Parasympathetic |  |

## Field guides (38)

| ok | page | register topic | note |
|---|---|---|---|
| ☑ | [An Introduction to Loving Boundaries](https://aistrangegame.com/learning/fieldguide/7-an-introduction-to-loving-boundaries.html) | 7. An Introduction to Loving Boundaries |  |
| ☑ | [Asking Good Questions](https://aistrangegame.com/learning/fieldguide/5-asking-good-questions.html) | 5. Asking Good Questions |  |
| ☑ | [Being Right vs Being Helpful](https://aistrangegame.com/learning/fieldguide/13-being-right-vs-being-helpful.html) | 13. Being Right vs Being Helpful |  |
| ☑ | [Empathic Listening](https://aistrangegame.com/learning/fieldguide/5-empathic-listening.html) | 5. Empathic Listening |  |
| ☑ | [Enmeshment vs Detachment](https://aistrangegame.com/learning/fieldguide/12-enmeshment-vs-detachment-a-better-way.html) | 12. Enmeshment vs Detachment: A Better Way |  |
| ☑ | [Facing a Craving, In the Moment](https://aistrangegame.com/learning/fieldguide/4-switch-addictions-and-white-knuckling.html) | 4. Switch Addictions and White-Knuckling |  |
| ☑ | [Handling Shame, Guilt, and Embarrassment](https://aistrangegame.com/learning/fieldguide/suggestions-for-handling-feelings-of-shame-embarrassment-and-guilt.html) | Suggestions for handling feelings of shame, embarrassment, and guilt. |  |
| ☑ | [Helpful Things to Say](https://aistrangegame.com/learning/fieldguide/7-helpful-things-to-say.html) | 7. Helpful Things to Say |  |
| ☑ | [Helping Them Access Help](https://aistrangegame.com/learning/fieldguide/2-helping-them-access-resources.html) | 2. Helping Them Access Resources |  |
| ☑ | [Helping Them Laugh](https://aistrangegame.com/learning/fieldguide/4-helping-them-laugh.html) | 4. Helping Them Laugh |  |
| ☑ | [Helping Them See More Clearly](https://aistrangegame.com/learning/fieldguide/9-helping-them-see-more-clearly.html) | 9. Helping Them See More Clearly |  |
| ☑ | [Holding a Boundary](https://aistrangegame.com/learning/fieldguide/9-boundaries-part-2.html) | 9. Boundaries Part 2 |  |
| ☑ | [How the Illness Sits Between You](https://aistrangegame.com/learning/fieldguide/4-how-mental-illness-affects-relationships.html) | 4. How Mental Illness Affects Relationships |  |
| ☑ | [How to Find a Great Therapist](https://aistrangegame.com/learning/fieldguide/how-to-find-a-great-therapist.html) | How to Find a Great Therapist |  |
| ☑ | [How You Shape What They're Carrying](https://aistrangegame.com/learning/fieldguide/5-how-relationships-affect-mental-illness.html) | 5. How Relationships Affect Mental Illness |  |
| ☑ | [It's Common. It's Also Treatable.](https://aistrangegame.com/learning/fieldguide/2-mental-illness-is-common-and-treatable.html) | 2. Mental Illness Is Common and Treatable |  |
| ☑ | [Making Repairs](https://aistrangegame.com/learning/fieldguide/introduction-to-week-4-making-repairs.html) | Introduction to Week 4: Making Repairs |  |
| ☑ | [Panic Attack, Anxiety Attack, or Panic Disorder?](https://aistrangegame.com/learning/fieldguide/the-difference-between-panic-attacks-anxiety-attacks-and-panic-disorder.html) | The Difference Between Panic Attacks, Anxiety Attacks, and Panic Disorder |  |
| ☑ | [Patience](https://aistrangegame.com/learning/fieldguide/17-patience.html) | 17. Patience |  |
| ☑ | [Reflecting Back What You Heard](https://aistrangegame.com/learning/fieldguide/5-reflective-listening.html) | 5. Reflective Listening |  |
| ☑ | [Seeing the Whole System](https://aistrangegame.com/learning/fieldguide/3-a-systemic-approach-to-treating-mental-illness.html) | 3. A Systemic Approach to Treating Mental Illness |  |
| ☑ | [Setting a Boundary](https://aistrangegame.com/learning/fieldguide/8-boundaries-part-1.html) | 8. Boundaries Part 1 |  |
| ☑ | [Speaking Up So They're Heard](https://aistrangegame.com/learning/fieldguide/12-advocating-in-an-effective-way.html) | 12. Advocating in an Effective Way |  |
| ☑ | [Starting From What's Still Working](https://aistrangegame.com/learning/fieldguide/15-a-strengths-based-approach.html) | 15. A Strengths-Based Approach |  |
| ☑ | [Steadying Yourself at a Checkup](https://aistrangegame.com/learning/fieldguide/suggestions-for-white-coat-syndrome.html) | Suggestions for white coat syndrome |  |
| ☑ | [Teaming Up Against the Illness](https://aistrangegame.com/learning/fieldguide/8-teaming-up-with-them-against-the-illness.html) | 8. Teaming Up With Them Against the Illness |  |
| ☑ | [The Problem With Advice](https://aistrangegame.com/learning/fieldguide/14-the-problem-with-advice.html) | 14. The Problem With Advice |  |
| ☑ | [The Role of Therapy](https://aistrangegame.com/learning/fieldguide/1-5-the-role-of-therapy.html) | 1.5 The Role of Therapy |  |
| ☑ | [What Causes Mental Illness](https://aistrangegame.com/learning/fieldguide/6-what-causes-mental-illness.html) | 6. What Causes Mental Illness |  |
| ☑ | [What If They Won't Talk](https://aistrangegame.com/learning/fieldguide/11-what-if-they-won-t-talk.html) | 11. What If They Won't Talk? |  |
| ☑ | [When a Symptom Won't Let You Go](https://aistrangegame.com/learning/fieldguide/health-anxiety.html) | Health Anxiety |  |
| ☑ | [When Illness Reaches Into Intimacy](https://aistrangegame.com/learning/fieldguide/understanding-how-mental-illness-impacts-intimacy.html) | Understanding How Mental Illness Impacts Intimacy |  |
| ☑ | [When It Feels Like a Panic Attack](https://aistrangegame.com/learning/fieldguide/how-to-stop-panic-attacks.html) | How to Stop Panic Attacks |  |
| ☑ | [When the Mind Jumps to the Worst](https://aistrangegame.com/learning/fieldguide/1-6-bonus-example-of-changing-how-you-think-catastrophizing.html) | 1.6 Bonus- Example of Changing How You Think- Catastrophizing |  |
| ☑ | [When They Won't Get Help](https://aistrangegame.com/learning/fieldguide/9-what-to-do-if-they-won-t-get-help.html) | 9. What to Do If They Won't Get Help |  |
| ☑ | [When You Can't Say No](https://aistrangegame.com/learning/fieldguide/why-many-people-don-t-set-boundaries.html) | Why Many People Don't Set Boundaries |  |
| ☑ | [Your Role as a Parent](https://aistrangegame.com/learning/fieldguide/your-role-as-a-parent.html) | Your Role as a Parent |  |
| ☑ | [Your Role as a Spouse](https://aistrangegame.com/learning/fieldguide/your-role-as-a-spouse.html) | Your Role as a Spouse |  |

## Icebreakers (1)

| ok | page | register topic | note |
|---|---|---|---|
| ☑ | [When Calm Feels Unsafe](https://aistrangegame.com/learning/icebreaker/why-do-i-cling-to-anxiety-and-pull-it-back-into-myself-when-i-would-finally-calm.html) | Why do I cling to anxiety and pull it back into myself when I would finally calm down and start feeling good? |  |
