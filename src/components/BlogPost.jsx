import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/BlogPost.css';

const allPosts = [
  {
    id: 1,
    category: "Style Guide",
    title: "How to Choose the Perfect Frame for Your Face Shape",
    excerpt: "Not all frames are created equal. Discover which styles complement your unique features and elevate your everyday look.",
    date: "April 12, 2026",
    readTime: "5 min read",
    tag: "Featured",
    author: "OptiLux Editorial",
    authorInitials: "OE",
    content: [
      {
        type: "intro",
        text: "Choosing the right eyewear goes far beyond picking a colour or brand you like. The shape of your face plays a huge role in determining which frames will enhance your features and which ones will work against them. Here is everything you need to know."
      },
      {
        type: "heading",
        text: "The Six Main Face Shapes"
      },
      {
        type: "paragraph",
        text: "Most faces fall into one of six categories: oval, round, square, heart, diamond, and oblong. Each shape has its own set of frames that work best, and understanding yours is the first step to making a confident choice."
      },
      {
        type: "heading",
        text: "Oval Faces — The Most Versatile"
      },
      {
        type: "paragraph",
        text: "If you have an oval face — balanced proportions, slightly wider forehead, and a gently rounded chin — you are in luck. Almost any frame style works for you. From bold square frames to delicate round ones, the world is your oyster. The only thing to avoid is frames that are too large and overwhelm your features."
      },
      {
        type: "heading",
        text: "Round Faces — Go Angular"
      },
      {
        type: "paragraph",
        text: "Round faces benefit greatly from angular, rectangular, or square frames. These add definition and create the illusion of a slimmer, more elongated face. Avoid round or small frames — they will only emphasise the roundness. Wayfarer-style frames are a particularly strong choice here."
      },
      {
        type: "heading",
        text: "Square Faces — Soften the Lines"
      },
      {
        type: "paragraph",
        text: "Strong jawlines and broad foreheads are the hallmark of square faces. Round or oval frames are your best friends — they soften the angular features and bring balance. Rimless and semi-rimless frames also work very well. Avoid boxy or geometric shapes that mirror your natural angles."
      },
      {
        type: "heading",
        text: "Heart Faces — Balance the Forehead"
      },
      {
        type: "paragraph",
        text: "A wider forehead tapering to a narrow chin — that is the heart shape. You want frames that draw attention downward and add width to the lower half of your face. Bottom-heavy frames, aviators, and light-coloured or rimless frames all work beautifully. Avoid top-heavy or decorative brow-line frames."
      },
      {
        type: "tip",
        text: "Pro Tip: When trying frames in store or online, pay attention to where the top of the frame sits in relation to your eyebrows. Ideally, the top of the frame should follow the natural line of your brows — this creates harmony and makes the glasses look like a natural extension of your face."
      },
      {
        type: "heading",
        text: "The OptiLux Recommendation"
      },
      {
        type: "paragraph",
        text: "At OptiLux we carry frames across all categories — from bold square Wayfarers to delicate round wire frames. If you are unsure of your face shape, visit our store in Diani or reach out via WhatsApp and our team will guide you to the perfect pair. We also offer a try-before-you-buy consultation for premium frames."
      },
    ]
  },
  {
    id: 2,
    category: "Eye Health",
    title: "Blue Light Glasses — Do They Actually Work?",
    excerpt: "With screen time at an all-time high, we break down the science behind blue light lenses and whether they are worth the investment.",
    date: "April 8, 2026",
    readTime: "4 min read",
    tag: "Popular",
    author: "Dr. Aisha Mwangi",
    authorInitials: "AM",
    content: [
      {
        type: "intro",
        text: "Blue light glasses have become one of the fastest-growing eyewear categories in recent years. With most Kenyans spending 8 to 12 hours a day in front of screens, the promise of reduced eye strain and better sleep sounds very appealing. But does the science back it up?"
      },
      {
        type: "heading",
        text: "What Is Blue Light?"
      },
      {
        type: "paragraph",
        text: "Blue light is a high-energy visible light with a short wavelength, sitting between 380 and 500 nanometres on the light spectrum. It is emitted by the sun, but also by LED screens — your phone, laptop, tablet, and television all produce significant amounts of it."
      },
      {
        type: "heading",
        text: "The Claims — What Blue Light Glasses Promise"
      },
      {
        type: "paragraph",
        text: "Manufacturers of blue light glasses typically make three key claims: that their lenses reduce eye strain, improve sleep quality by blocking blue light at night, and protect long-term eye health. Let us examine each one."
      },
      {
        type: "heading",
        text: "Eye Strain — Partially Supported"
      },
      {
        type: "paragraph",
        text: "Most eye strain from screen use is actually caused by reduced blinking and poor lighting — not blue light itself. However, many users report genuine relief when wearing blue light glasses. This could be a placebo effect, or it could be that the slight tint reduces contrast fatigue. Either way, if they help you feel better, that matters."
      },
      {
        type: "heading",
        text: "Sleep Quality — Strongly Supported"
      },
      {
        type: "paragraph",
        text: "This is where the evidence is clearest. Blue light suppresses melatonin production — the hormone that signals your body it is time to sleep. Using screens before bed delays melatonin release and disrupts your sleep cycle. Blue light glasses worn in the evening have been shown in multiple studies to improve sleep onset time and quality."
      },
      {
        type: "tip",
        text: "OptiLux Tip: For maximum sleep benefit, wear your blue light glasses for at least 2 hours before bed. Pair this with reducing screen brightness after sunset and you will notice a significant improvement in sleep quality within a week."
      },
      {
        type: "heading",
        text: "Our Verdict"
      },
      {
        type: "paragraph",
        text: "Blue light glasses are not a miracle cure, but they are a worthwhile investment — especially for the sleep benefits alone. OptiLux stocks a curated range of blue light lenses in both prescription and non-prescription options, starting from Kes 3,500."
      },
    ]
  },
  {
    id: 3,
    category: "Brand Spotlight",
    title: "Ray-Ban Through the Decades — A Legacy of Cool",
    excerpt: "From Aviators in the 1930s to modern Wayfarers, we trace the iconic journey of the world's most recognisable eyewear brand.",
    date: "March 30, 2026",
    readTime: "6 min read",
    tag: null,
    author: "OptiLux Editorial",
    authorInitials: "OE",
    content: [
      {
        type: "intro",
        text: "Few brands in the history of fashion have achieved the kind of enduring cultural relevance that Ray-Ban has. From military pilots to Hollywood icons, from Nairobi streets to Milan runways — Ray-Ban is everywhere, and for very good reason."
      },
      {
        type: "heading",
        text: "The 1930s — Born from Military Need"
      },
      {
        type: "paragraph",
        text: "Ray-Ban was founded in 1936 when the US Army Air Corps commissioned Bausch & Lomb to create sunglasses that would protect pilots from the intense glare at high altitudes. The result was the now-iconic Aviator — a teardrop-shaped lens in a thin metal frame. The name Ray-Ban referred to the glasses banning the sun's rays."
      },
      {
        type: "heading",
        text: "The 1950s and 60s — Hollywood Takes Over"
      },
      {
        type: "paragraph",
        text: "The Wayfarer was introduced in 1956 and immediately became a cultural phenomenon. Its bold plastic frame was unlike anything seen before. James Dean wore them. Audrey Hepburn wore them in Breakfast at Tiffany's. Bob Dylan wore them on album covers. By the 1960s, Ray-Ban was not just eyewear — it was identity."
      },
      {
        type: "heading",
        text: "The 1980s — A Commercial Revival"
      },
      {
        type: "paragraph",
        text: "By the late 1970s, Ray-Ban sales had declined. Then came the product placement strategy that changed everything. Ray-Ban paid to have their glasses featured in Hollywood films — most notably Risky Business in 1983, where Tom Cruise danced in Wayfarers, and Top Gun in 1986, where Maverick made Aviators cool all over again. Sales went from 18,000 units a year to 4 million."
      },
      {
        type: "tip",
        text: "Did You Know? OptiLux is an authorised Ray-Ban stockist in Kenya. Every pair we sell comes with the original case, authentication card, and manufacturer warranty. Never buy Ray-Bans from an unverified source — counterfeits are extremely common."
      },
      {
        type: "heading",
        text: "Ray-Ban Today"
      },
      {
        type: "paragraph",
        text: "Now owned by EssilorLuxottica, Ray-Ban continues to innovate. Their smart glasses collaboration with Meta brought audio and camera capabilities to the iconic frames. Yet despite all the technology, the Aviator and Wayfarer remain their best-sellers — a testament to timeless design."
      },
    ]
  },
  {
    id: 4,
    category: "Trends",
    title: "2026 Eyewear Trends You Need to Know About",
    excerpt: "Oversized frames are back, tortoiseshell is everywhere, and minimalist metals are ruling boardrooms. Here is what is hot this year.",
    date: "March 22, 2026",
    readTime: "3 min read",
    tag: "New",
    author: "Amina Wanjiku",
    authorInitials: "AW",
    content: [
      {
        type: "intro",
        text: "2026 is shaping up to be one of the most exciting years in eyewear fashion in recent memory. Whether you are shopping for sunglasses or prescription frames, these are the trends defining the year."
      },
      {
        type: "heading",
        text: "1. Oversized Everything"
      },
      {
        type: "paragraph",
        text: "Big frames are back with a vengeance. We are talking wide, dramatic silhouettes that make a statement before you even open your mouth. Think 1970s glamour updated for 2026 — bold acetate in tortoiseshell, caramel, and deep burgundy. These frames suit oval and oblong faces particularly well."
      },
      {
        type: "heading",
        text: "2. Tortoiseshell Renaissance"
      },
      {
        type: "paragraph",
        text: "Tortoiseshell never truly went away, but in 2026 it is experiencing a full revival. From classic warm browns to cool blue-grey tortoiseshell, this pattern is appearing on everything from round reading glasses to oversized cat-eyes. It is the one pattern that works for both casual and professional settings."
      },
      {
        type: "heading",
        text: "3. Minimalist Metal Frames"
      },
      {
        type: "paragraph",
        text: "On the opposite end of the spectrum, ultra-thin metal frames in gold, silver, and rose gold are dominating professional and academic spaces. These whisper-thin frames pair beautifully with formal wear and give an intellectual, refined edge to any look."
      },
      {
        type: "tip",
        text: "Style Tip: Mix your eyewear with the occasion. Keep a pair of minimalist metal frames for work and a bold oversized pair for weekends. Two pairs, two personalities — that is the OptiLux way."
      },
      {
        type: "heading",
        text: "4. Tinted Lenses for Everyday Wear"
      },
      {
        type: "paragraph",
        text: "Light tints — soft pink, pale yellow, and lilac — are crossing over from sunglasses into everyday prescription frames. They add personality without being too bold, and they pair beautifully with the minimalist metal trend. Expect to see them everywhere in Nairobi's creative and fashion circles this year."
      },
    ]
  },
  {
    id: 5,
    category: "Eye Health",
    title: "How Often Should You Get Your Eyes Checked?",
    excerpt: "Most people wait until their vision deteriorates before visiting an optician. Here is why that is a mistake and what the experts say.",
    date: "March 15, 2026",
    readTime: "4 min read",
    tag: null,
    author: "Dr. Aisha Mwangi",
    authorInitials: "AM",
    content: [
      {
        type: "intro",
        text: "The vast majority of Kenyans only visit an optician when something is visibly wrong — blurry vision, persistent headaches, or difficulty reading. But by the time these symptoms appear, your eye health may have been declining for years. Here is what the experts actually recommend."
      },
      {
        type: "heading",
        text: "The General Rule"
      },
      {
        type: "paragraph",
        text: "For adults with no existing eye conditions or risk factors, a comprehensive eye exam every two years is the minimum recommendation. However, if you spend significant time in front of screens, have a family history of glaucoma or macular degeneration, or are over 40, annual exams are strongly advised."
      },
      {
        type: "heading",
        text: "Children Need More Frequent Checks"
      },
      {
        type: "paragraph",
        text: "Vision problems in children are often missed because children do not know what normal vision looks like — they simply adapt. Undiagnosed myopia is one of the leading causes of poor academic performance. Children should have their eyes checked before starting school, and annually thereafter throughout their school years."
      },
      {
        type: "heading",
        text: "Warning Signs to Watch For"
      },
      {
        type: "paragraph",
        text: "Do not wait for your next scheduled exam if you notice any of the following: sudden changes in vision, difficulty seeing at night, frequent headaches after reading or screen use, seeing halos around lights, or any eye pain or redness that persists for more than 48 hours."
      },
      {
        type: "tip",
        text: "OptiLux Tip: We partner with certified opticians across Nairobi, Mombasa, and Kisumu who offer comprehensive eye exams. Ask us for a referral and receive 10% off your next frame purchase when you show your exam results."
      },
    ]
  },
  {
    id: 6,
    category: "Style Guide",
    title: "Sunglasses for Every Occasion — From Beach to Boardroom",
    excerpt: "One pair is never enough. We curate the perfect sunglasses for every setting in your life, from Diani beach to Nairobi CBD.",
    date: "March 10, 2026",
    readTime: "5 min read",
    tag: null,
    author: "Amina Wanjiku",
    authorInitials: "AW",
    content: [
      {
        type: "intro",
        text: "There is a common misconception that sunglasses are a one-size-fits-all accessory. The truth is, the right pair of sunglasses can elevate any outfit and setting — but only if you match the style to the occasion. Here is our definitive guide."
      },
      {
        type: "heading",
        text: "The Beach — Coastal Kenya"
      },
      {
        type: "paragraph",
        text: "Whether you are on the white sands of Diani or the rugged coast of Watamu, beach sunglasses need to be bold, fun, and UV400 protective. Oversized frames in tortoiseshell or bright colours work perfectly. Polarised lenses are a must — they cut glare off the water dramatically and reduce eye fatigue on long beach days."
      },
      {
        type: "heading",
        text: "Safari and Outdoors"
      },
      {
        type: "paragraph",
        text: "For Maasai Mara game drives and Aberdare hikes, you need durability above all else. Wraparound sport frames with polarised or photochromic lenses provide maximum coverage and adapt to changing light conditions. Oakley and Maui Jim both excel in this category."
      },
      {
        type: "heading",
        text: "City and Everyday Nairobi"
      },
      {
        type: "paragraph",
        text: "Nairobi's streets demand versatility. Aviators and classic Wayfarers are perennial favourites — they transition effortlessly from matatu rides to lunch at a Westlands restaurant. Stick to neutral lenses — grey or brown — for the most versatile everyday option."
      },
      {
        type: "tip",
        text: "Style Tip: For Nairobi CBD, avoid frames that are too flashy or oversized — they can read as unprofessional in conservative work environments. A slim metal frame or classic Wayfarer strikes the perfect balance between style and professionalism."
      },
      {
        type: "heading",
        text: "Formal Events and Boardrooms"
      },
      {
        type: "paragraph",
        text: "Yes, sunglasses at formal events. Done right, a sleek pair of slim metal-frame sunglasses worn to an outdoor corporate event or rooftop function can look incredibly sharp. The key is restraint — thin frames, subtle lens tints, nothing that shouts for attention."
      },
    ]
  },
  {
    id: 7,
    category: "Brand Spotlight",
    title: "Oakley vs Maui Jim — Which Performance Brand Wins?",
    excerpt: "Two giants of performance eyewear go head to head. We compare lens technology, durability, style, and value for Kenyan buyers.",
    date: "March 4, 2026",
    readTime: "7 min read",
    tag: "Popular",
    author: "Brian Otieno",
    authorInitials: "BO",
    content: [
      {
        type: "intro",
        text: "When it comes to performance eyewear — sunglasses designed for sport, outdoor activity, and harsh light conditions — two brands consistently rise to the top: Oakley and Maui Jim. Both are exceptional. But they serve different masters. Here is how they compare."
      },
      {
        type: "heading",
        text: "Lens Technology"
      },
      {
        type: "paragraph",
        text: "Oakley's Prizm lens technology enhances specific colours and contrasts for different environments — there are Prizm lenses optimised for road cycling, trail running, golf, and more. Maui Jim's PolarizedPlus2 technology goes in a different direction, focusing on eliminating glare while boosting colour saturation across the board. Both are world-class, but Oakley wins for sport-specific performance while Maui Jim wins for all-round visual comfort."
      },
      {
        type: "heading",
        text: "Frame Durability"
      },
      {
        type: "paragraph",
        text: "Oakley builds frames with O-Matter — a lightweight, stress-resistant nylon that can take serious impact. Their frames are famously tough and many come with impact-resistant lenses as standard. Maui Jim frames are beautiful but slightly more delicate — they are built for active leisure rather than extreme sport."
      },
      {
        type: "heading",
        text: "Style"
      },
      {
        type: "paragraph",
        text: "This is where Maui Jim pulls ahead for many buyers. Oakley's aesthetic is unmistakably sporty — great on a trail, slightly awkward at a dinner. Maui Jim has a more lifestyle-oriented design language that transitions from beach to restaurant with ease. If you want performance eyewear you can also wear casually, Maui Jim is the stronger choice."
      },
      {
        type: "tip",
        text: "OptiLux Verdict: If you are an active sportsperson — cyclist, runner, golfer — go Oakley. If you want premium performance for everyday outdoor life in Kenya's sunshine, go Maui Jim. Both are available at OptiLux with full warranty."
      },
      {
        type: "heading",
        text: "Value in the Kenyan Market"
      },
      {
        type: "paragraph",
        text: "Both brands sit at the premium end of the market. Oakley entry-level performance frames start around Kes 12,000 at OptiLux, while Maui Jim starts around Kes 15,000. Given that both come with warranties and represent a significant upgrade in eye protection and visual clarity over standard sunglasses, both represent strong long-term value."
      },
    ]
  },
  {
    id: 8,
    category: "Trends",
    title: "The Rise of Gender-Neutral Eyewear in Africa",
    excerpt: "A new wave of designers is breaking traditional boundaries in eyewear. OptiLux explores this exciting shift in African fashion.",
    date: "February 28, 2026",
    readTime: "4 min read",
    tag: "New",
    author: "OptiLux Editorial",
    authorInitials: "OE",
    content: [
      {
        type: "intro",
        text: "Across Africa's fashion capitals — from Lagos to Nairobi, from Accra to Cape Town — a quiet revolution is happening in eyewear. Gender-neutral design is no longer a niche Western concept. It is arriving on African runways, streets, and social media feeds with confidence and cultural authenticity."
      },
      {
        type: "heading",
        text: "What Does Gender-Neutral Eyewear Look Like?"
      },
      {
        type: "paragraph",
        text: "Gender-neutral frames tend to sit in the middle ground — not overtly feminine or masculine in their proportions. Think medium-sized round or square frames, clean lines, and versatile colourways like black, clear, off-white, and muted earth tones. The focus is on the frame's relationship with the wearer's personality, not their gender."
      },
      {
        type: "heading",
        text: "African Designers Leading the Charge"
      },
      {
        type: "paragraph",
        text: "Several African eyewear designers are at the forefront of this movement, creating frames that draw on traditional African aesthetics — geometric patterns, warm earth tones, bold silhouettes — while completely abandoning gendered marketing. Their collections are labelled simply by frame name, not by who they are supposedly for."
      },
      {
        type: "heading",
        text: "What This Means for OptiLux Customers"
      },
      {
        type: "paragraph",
        text: "At OptiLux, we have always believed that the best frame is the one that speaks to you — regardless of what category it was marketed under. We encourage every customer to try frames across our entire collection without limitation. Our staff are trained to help you find what works for your face, your style, and your personality."
      },
      {
        type: "tip",
        text: "Style Note: Some of our most popular frames among male customers come from ranges originally marketed to women, and vice versa. Do not let labels limit your choices. Come in and try everything."
      },
    ]
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const found = allPosts.find(p => p.id === parseInt(id));
    setPost(found);
    if (found) {
      const related = allPosts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) return (
    <div className="blogpost-notfound">
      <p>Article not found.</p>
      <button onClick={() => navigate("/blog")}>← Back to Blog</button>
    </div>
  );

  return (
    <div className="blogpost-page">

      {/* NAVBAR */}
      <nav className="about-nav">
        <svg className="logo-icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="42" height="42" rx="10" fill="#0f172a"/>
          <circle cx="13" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
          <circle cx="29" cy="22" r="7" stroke="#3b82f6" strokeWidth="2" fill="none"/>
          <path d="M20 22 L22 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 22 L6 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 22 L36 19" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="11" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
          <circle cx="27" cy="20" r="1.2" fill="#60a5fa" opacity="0.6"/>
          <circle cx="21" cy="11" r="2" fill="#facc15"/>
        </svg>
        <div className="about-nav-links">
          <span onClick={() => navigate("/")} className="about-nav-link">Home</span>
          <span onClick={() => navigate("/products")} className="about-nav-link">Shop</span>
          <span onClick={() => navigate("/about")} className="about-nav-link">About</span>
          <span onClick={() => navigate("/blog")} className="about-nav-link active">Blog</span>
        </div>
        <button className="about-nav-cta" onClick={() => navigate("/")}>Shop Now</button>
      </nav>

      {/* BACK BUTTON */}
      <div className="blogpost-back">
        <button onClick={() => navigate("/blog")}>← Back to Blog</button>
      </div>

      {/* ARTICLE HEADER */}
      <header className="blogpost-header">
        <div className="blogpost-header-inner">
          <p className="blogpost-category">{post.category}</p>
          {post.tag && <span className={`blogpost-tag ${post.tag.toLowerCase()}`}>{post.tag}</span>}
          <h1>{post.title}</h1>
          <p className="blogpost-excerpt">{post.excerpt}</p>
          <div className="blogpost-meta">
            <div className="blogpost-author">
              <div className="blogpost-author-avatar">{post.authorInitials}</div>
              <div>
                <p className="blogpost-author-name">{post.author}</p>
                <p className="blogpost-author-date">{post.date} · {post.readTime}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article className="blogpost-body">
        <div className="blogpost-body-inner">
          {post.content.map((block, i) => {
            if (block.type === "intro") return (
              <p key={i} className="blogpost-intro">{block.text}</p>
            );
            if (block.type === "heading") return (
              <h2 key={i} className="blogpost-heading">{block.text}</h2>
            );
            if (block.type === "paragraph") return (
              <p key={i} className="blogpost-paragraph">{block.text}</p>
            );
            if (block.type === "tip") return (
              <div key={i} className="blogpost-tip">
                <span className="blogpost-tip-icon">◈</span>
                <p>{block.text}</p>
              </div>
            );
            return null;
          })}

          {/* SHARE */}
          <div className="blogpost-share">
            <p>Share this article</p>
            <div className="blogpost-share-btns">
              <button>Twitter / X</button>
              <button>Facebook</button>
              <button>WhatsApp</button>
              <button>Copy Link</button>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="blogpost-related">
          <div className="blogpost-related-inner">
            <p className="about-section-tag">More Like This</p>
            <h2>Related Articles</h2>
            <div className="blogpost-related-grid">
              {relatedPosts.map((related, i) => (
                <div
                  key={i}
                  className="blogpost-related-card"
                  onClick={() => navigate(`/blog/${related.id}`)}
                >
                  <div className="blogpost-related-image">
                    <span>
                      {related.category === "Style Guide" && "◈"}
                      {related.category === "Eye Health" && "◉"}
                      {related.category === "Brand Spotlight" && "◇"}
                      {related.category === "Trends" && "◆"}
                    </span>
                  </div>
                  <div className="blogpost-related-body">
                    <p className="blogpost-related-cat">{related.category}</p>
                    <h4>{related.title}</h4>
                    <p>{related.date} · {related.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER NOTE */}
      <div className="about-footer-note">
        <p>© 2026 OptiLux. All rights reserved. — Diani, Kenya</p>
      </div>

    </div>
  );
};

export default BlogPost;