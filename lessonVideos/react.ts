import {
  title, keyterms, bullets, steps, diagram, flow, code, terminal, compare, scenario, quiz, stat, recap,
  type LessonVideoScript,
} from "./core";

// ════════════════════════════════════════════════════════════════
// REACT FRONTEND — deep scripts (course-react-frontend)
// ════════════════════════════════════════════════════════════════

export const deepRF: LessonVideoScript[] = [
  {
    lessonId: "les-rf-1-1", lessonTitle: "JSX & Component Thinking", courseId: "course-react-frontend",
    scenes: [
      title(
        "JSX & Component Thinking",
        "react fundamentals · lesson 1",
        "UI as a function of state — the mental model that makes React click",
        [
          "React replaces 'update the page piece by piece' with one idea: describe what the UI should look like for any state, and let React handle the updates.",
          "This lesson builds that mental model and the JSX syntax that expresses it.",
        ],
        "cyan",
        [
          "Explain 'UI = f(state)' in one sentence",
          "Write components with JSX confidently",
          "Compose small components into pages",
          "Know the JSX rules that differ from HTML"
        ]
      ),
      keyterms([
        { term: "Component", definition: "A function that takes props and returns UI — the building block of every React app." },
        { term: "JSX", definition: "HTML-like syntax that compiles to JavaScript function calls — expressions in braces, components in caps." },
        { term: "Declarative UI", definition: "You describe the result for any state; React computes the DOM changes to get there." },
        { term: "Reconciliation", definition: "React's diffing of new UI against old — it updates only what changed." },
        { term: "Composition", definition: "Building big UIs from small components — the design skill of React." },
      ], [
        "Five terms, one mental model.",
        "A component is a function from props to UI — that is genuinely all it is.",
        "JSX is the syntax: HTML-like markup that compiles to plain function calls.",
        "Declarative UI is the shift: describe the result, not the DOM surgery.",
        "Reconciliation is React's side of the bargain — it diffs and updates only what changed.",
        "And composition is your side: the craft of building big interfaces from small, reusable pieces.",
      ], "cyan"),
      code("Greeting.tsx", [
        "function Greeting({ name }) {",
        "  return <h1>Hello, {name}!</h1>;",
        "}",
        "",
        "// usage — components are just functions in JSX",
        "<Greeting name=\"Ama\" />",
        "<Greeting name=\"Kofi\" />",
        "// renders two h1s — same component, different props",
      ], [
        "Your first component, dissected.",
        "Greeting is a function taking one prop and returning JSX — an h1 with an interpolation in braces.",
        "Using it looks like HTML but is a function call — Greeting with a name prop. Two usages, two outputs, one definition.",
        "Notice what is absent: no document.querySelector, no manual text updates. You described the result; React realized it.",
      ], "cyan"),
      diagram("Components Compose", {
        app: { label: "App", x: 380, y: 60, shape: "square", emphasis: true },
        nav: { label: "Navbar", x: 150, y: 200, shape: "square" },
        feed: { label: "CourseList", x: 380, y: 200, shape: "square" },
        side: { label: "ProfileCard", x: 610, y: 200, shape: "square" },
        item: { label: "CourseCard ×N", x: 380, y: 330, shape: "square" },
      }, [
        { from: "app", to: "nav" }, { from: "app", to: "feed" }, { from: "app", to: "side" },
        { from: "feed", to: "item", animated: true, label: "courses.map(...)" },
      ], [
        "Apps are trees of components — three levels deep here, but the pattern scales infinitely.",
        "App composes Navbar, CourseList, and ProfileCard — each a function, each testable alone.",
        "CourseList maps its course data to CourseCard — one definition, N instances, each with its own props.",
        "This is the design skill: finding the small pieces, naming them well, and composing. Every professional React codebase is this tree, done deliberately.",
      ], "Small pieces, composed deliberately", "cyan"),
      code("jsx-rules.tsx", [
        "// JSX is JavaScript with rules — the big four:",
        "const el = (",
        "  <div className=\"card\">     {/* className, not class */}",
        "    <h2>{title}</h2>          {/* braces = JS expression */}",
        "    {items.length > 0 && <ul>…</ul>}   {/* conditional */}",
        "    {items.map(i => <li key={i.id}>{i.name}</li>)}",
        "  </div>                      {/* one root element */}",
        ");",
      ], [
        "JSX looks like HTML and behaves like JavaScript — four rules cover the differences.",
        "className instead of class — because class is a reserved word in JavaScript.",
        "Braces drop you back into expressions: variables, math, function calls.",
        "Conditionals are just JavaScript — the && pattern renders only when truthy.",
        "Lists are map with a key prop — keys let React track items across re-renders. And every JSX expression needs one root element.",
      ], "cyan"),
      scenario(
        "Case study · the copy-paste page",
        "A junior dev builds a course page by copy-pasting a card's HTML twelve times, editing each. First change request: 'make the price badge green' — a twelve-file afternoon.",
        "The refactor to components took the same afternoon: one CourseCard component, the page maps data to it, and the green badge is now a one-line change that applies everywhere. The data never changed — only the duplication did.",
        "The rule of three: the third time you copy-paste markup, extract a component. Components are not about technology — they are about never editing twelve copies again.",
      ),
      quiz(
        "Why does JSX use className instead of class?",
        ["class is a reserved word in JavaScript — JSX compiles to JS", "It is a React branding choice", "HTML classes are deprecated", "It improves performance"],
        0,
        "JSX compiles to JavaScript function calls, and class is reserved — so the DOM property name className is used. The HTML-in-JS illusion has seams; this is the most famous one.",
        [
          "Knowledge check — JSX is JavaScript wearing HTML clothes.",
        ],
        "purple"
      ),
      recap([
        "Component = function(props) → UI. That is the whole definition.",
        "JSX: className not class, braces for expressions, one root, keys in lists.",
        "Declarative: describe the result for any state; React computes the DOM diff.",
        "Compose: find small pieces, name them, map data onto them.",
        "Rule of three: third copy-paste becomes a component.",
      ], [
        "What you now know.",
        "The mental model is installed: UI as a function of state, expressed in JSX, built by composition.",
        "Next lesson: props — how data flows into those components.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-rf-1-2", lessonTitle: "Props & Component Composition", courseId: "course-react-frontend",
    scenes: [
      title(
        "Props & Composition",
        "react fundamentals · the data flow",
        "Data flows down, events flow up — the one-way street that keeps React apps predictable",
        [
          "Props are how data enters a component, and callbacks are how information leaves. Master this one-way flow and even large React apps stay traceable.",
        ],
        "purple",
        [
          "Pass and read props with correct types",
          "Use children for composition",
          "Send events UP with callback props",
          "Lift state to the common parent when siblings share"
        ]
      ),
      keyterms([
        { term: "Props", definition: "Read-only inputs to a component — data flows DOWN from parent to child, never up." },
        { term: "children", definition: "The special prop holding everything between a component's tags — the basis of layout components." },
        { term: "Callback prop", definition: "A function passed down so the child can report events UP — onSelected, onChanged." },
        { term: "Lifting state", definition: "Moving shared state to the nearest common parent — siblings then receive it as props." },
        { term: "Prop drilling", definition: "Passing props through many middle layers that don't use them — the smell that suggests Context." },
      ], [
        "Five terms, one direction of traffic.",
        "Props are the component's inputs — read-only, flowing down only.",
        "Children is the special prop: whatever appears between the component's tags.",
        "Callback props are the up-ramp: functions passed down that the child calls to report events.",
        "Lifting state moves shared data to the common parent so both siblings get it as props.",
        "And prop drilling is the smell when data passes through five layers that never use it — the signal to reach for Context, a later lesson.",
      ], "purple"),
      code("UserCard.tsx", [
        "function UserCard({ user, onSelect }) {",
        "  return (",
        "    <button onClick={() => onSelect(user.id)}>",
        "      <img src={user.avatar} alt={user.name} />",
        "      <div>",
        "        <strong>{user.name}</strong>",
        "        <span>{user.role}</span>",
        "      </div>",
        "    </button>",
        "  );",
        "}",
      ], [
        "A real component with the full data flow, in twelve lines.",
        "Props arrive: user, the data to display, and onSelect, a function to call when clicked.",
        "The render is pure display — props to markup, no surprises.",
        "The click is the up-ramp: the child does not know WHAT selecting means — it just calls the function it was given. The parent decides.",
        "This ignorance is the design: UserCard works identically in a directory, a chat, or a checkout — because selection semantics live in the parent.",
      ], "purple"),
      flow("The One-Way Street", {
        parent: { label: "Parent (owns state)", x: 380, y: 60, shape: "square", emphasis: true },
        childa: { label: "Child A", x: 200, y: 220, shape: "square" },
        childb: { label: "Child B", x: 560, y: 220, shape: "square" },
      }, [
        { from: "parent", to: "childa", animated: true, label: "props ↓" },
        { from: "parent", to: "childb", animated: true, label: "props ↓" },
        { from: "childa", to: "parent", label: "callback ↑", animated: true },
      ], [
        "The one-way street in one picture.",
        "The parent owns the state and passes props down to both children — data only travels downward.",
        "Child A reports events up through its callback — information travels up only as function calls.",
        "When Child B needs the same state, nothing changes structurally: the state is already lifted to the parent, which passes it down. One direction, always traceable.",
      ], "Props ↓ down, callbacks ↑ up", "purple"),
      code("composition.tsx", [
        "// children = layout without prop-drilling content",
        "function Panel({ title, children }) {",
        "  return (",
        "    <section className=\"panel\">",
        "      <h3>{title}</h3>",
        "      {children}    {/* whatever the parent put inside */}",
        "    </section>",
        "  );",
        "}",
        "",
        "<Panel title=\"Course details\">",
        "  <CourseInfo />   {/* Panel doesn't need to know */}",
        "</Panel>",
      ], [
        "The children prop is composition's secret weapon.",
        "Panel defines structure — border, title, spacing — and renders children wherever content belongs.",
        "The parent fills it with anything: CourseInfo, a chart, a form. Panel neither knows nor cares.",
        "This is how Card, Sidebar, Modal, and Layout components work in every serious codebase — structure once, content injected, zero prop coupling.",
      ], "purple"),
      scenario(
        "Case study · the sibling sync",
        "A search page: a SearchBox component and a Results component. Typing in the box must filter the list — but they are siblings, sharing no props.",
        "The naive fix — results reading the input's DOM — breaks every React rule. The React fix: lift the query state to their common parent. SearchBox receives query + onQueryChanged as props; Results receives the filtered list.",
        "Twenty minutes of refactoring, and the flow is a straight line: parent state → both children → callback back up. When siblings need the same data, the answer is always the same: lift the state.",
      ),
      quiz(
        "A child needs to change the parent's state. How?",
        ["Call a callback prop the parent passed down", "Mutate the prop directly", "Use document.querySelector", "Re-render the parent manually"],
        0,
        "Props are read-only — the child reports through callbacks, and the PARENT changes its own state. One-way flow preserved: the state owner is the only writer.",
        [
          "Knowledge check — who owns the state, who writes it?",
        ],
        "purple"
      ),
      recap([
        "Props flow down, read-only; callbacks report up — one-way always.",
        "children enables layout composition: structure once, content injected.",
        "Components stay reusable by staying ignorant of WHERE they are used.",
        "Shared sibling state? Lift it to the common parent.",
        "Prop drilling through unused layers is the smell that says 'Context' — a later lesson.",
      ], [
        "What you now know.",
        "The data flow is installed: down as props, up as callbacks, lifted when shared. This is the circulatory system of every React app.",
        "Next lesson: state and effects — the hooks that give components memory.",
      ], "purple"),
    ],
  },
  {
    lessonId: "les-rf-2-1", lessonTitle: "useState & useEffect", courseId: "course-react-frontend",
    scenes: [
      title(
        "useState & useEffect",
        "react fundamentals · hooks",
        "Memory for your components — and the effects that reach the outside world",
        [
          "Two hooks run ninety percent of React: useState gives components memory, useEffect connects them to the outside world.",
          "Master these two and most of React is simply reading.",
        ],
        "cyan",
        [
          "Add state with useState and update it correctly",
          "Understand what triggers a re-render",
          "Run side effects with useEffect and dependency arrays",
          "Avoid the stale-closure and infinite-loop traps"
        ]
      ),
      keyterms([
        { term: "useState", definition: "Declares a state variable + its setter: const [count, setCount] = useState(0)." },
        { term: "Re-render", definition: "React re-runs your component function to produce new UI — triggered by state or prop changes." },
        { term: "useEffect", definition: "Runs a function after render — for anything outside React: fetching, subscriptions, timers." },
        { term: "Dependency array", definition: "The effect's watch list — re-run only when a listed value changed. Empty array = once." },
        { term: "Cleanup function", definition: "What the effect returns — runs before the next effect and on unmount. Cancels timers, ignores stale fetches." },
      ], [
        "Five terms, two hooks.",
        "useState declares memory: the value and its setter, in one destructure.",
        "A re-render is React re-running your function — triggered by state or prop changes, producing new UI from new values.",
        "useEffect is the door to the outside world — fetching, subscribing, timing — things React itself does not do.",
        "The dependency array is the contract: re-run the effect only when these values change. An empty array means once, after first render.",
        "And the cleanup function is your exit ramp — it runs before the next effect fires, letting you cancel what the last one started.",
      ], "cyan"),
      code("Counter.tsx", [
        "function Counter() {",
        "  const [count, setCount] = useState(0);",
        "",
        "  return (",
        "    <button onClick={() => setCount(count + 1)}>",
        "      Clicked {count} times",
        "    </button>",
        "  );",
        "}",
        "// click → setCount → re-render → new UI. The loop.",
      ], [
        "The reactive loop in eight lines.",
        "useState returns a pair: the current value and its setter. The destructure names both.",
        "The button's onClick calls setCount — scheduling a state change.",
        "React re-runs the component with the new count, and the JSX renders the new number. Click, set, re-render, display — that is the entire reactive model, and every React app is this loop at scale.",
      ], "cyan"),
      code("Profile.tsx", [
        "function Profile({ userId }) {",
        "  const [user, setUser] = useState(null);",
        "",
        "  useEffect(() => {",
        "    let ignore = false;             // cleanup flag",
        "    fetch(`/api/users/${userId}`)",
        "      .then(r => r.json())",
        "      .then(u => { if (!ignore) setUser(u); });",
        "    return () => { ignore = true; }; // ignore stale fetches",
        "  }, [userId]);   // re-run when userId changes",
        "",
        "  return user ? <h1>{user.name}</h1> : <p>Loading…</p>;",
        "}",
      ], [
        "The fetch pattern you will write a thousand times — with its two classic traps pre-solved.",
        "The effect fetches when userId changes — the dependency array makes that a contract, not a coincidence.",
        "Trap one: stale responses. Click user 1 then user 2 quickly — two fetches race. The ignore flag makes the slower, older fetch discard itself.",
        "Trap two: missing dependencies. Omit userId from the array and the effect fetches once with the FIRST id — forever. The lint rule enforces this; do not fight it.",
        "And the render guards the null state — loading UI until data arrives.",
      ], "cyan"),
      scenario(
        "Case study · the infinite loop",
        "A dashboard's network tab shows a fetch storm: hundreds of requests per minute. The effect: useEffect(() => { fetch(...).then(setItems) }) — with no dependency array at all.",
        "Without an array, the effect re-runs after EVERY render; setItems causes a render; which re-runs the effect; which sets again. The loop is self-sustaining — effect, render, effect.",
        "The fix is the dependency array: [] for fetch-once, or [query] for fetch-when-query-changes. The array is not decoration — it is the difference between an effect and a feedback loop.",
      ),
      quiz(
        "useEffect(() => {...}, []) — when does the effect run?",
        ["Once, after the first render", "On every render", "Never", "Only when props change"],
        0,
        "An empty dependency array means 'no watch list' — run once after mount, never re-run. It is the standard shape for one-time setup like initial fetches and subscriptions.",
        [
          "Knowledge check — the empty array's exact meaning.",
        ],
        "purple"
      ),
      recap([
        "useState: value + setter; calling the setter schedules a re-render.",
        "useEffect: after-render side effects — fetch, subscribe, timer.",
        "Dependency array = re-run contract; [] = once; [id] = when id changes.",
        "Cleanup handles stale async: the ignore flag discards raced responses.",
        "No array = re-run every render = the infinite-loop bug. Always pass the array.",
      ], [
        "What you now know.",
        "The two workhorse hooks, their traps, and the loop that powers every React app.",
        "Next lesson: useReducer — what to reach for when state transitions have rules.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-rf-2-2", lessonTitle: "useReducer & Complex State", courseId: "course-react-frontend",
    scenes: [
      title(
        "useReducer & Complex State",
        "react fundamentals · state architecture",
        "One function owns every state transition — testable, traceable, sane",
        [
          "When state updates depend on each other, scattered setState calls become bug farms. useReducer centralizes every transition in one pure function.",
          "This is the bridge from React beginner to state architect.",
        ],
        "purple",
        [
          "Write reducers as pure state-transition functions",
          "Dispatch typed actions instead of setting scattered state",
          "Test reducers without rendering anything",
          "Choose between useState and useReducer honestly"
        ]
      ),
      keyterms([
        { term: "Reducer", definition: "A pure function: (currentState, action) → nextState. No side effects, no mutation." },
        { term: "Action", definition: "A plain object describing WHAT happened: { type: 'add', item } — events, not instructions." },
        { term: "dispatch", definition: "The function you call with an action: dispatch({ type: 'add', item }) — triggers the reducer." },
        { term: "Pure function", definition: "Same inputs → same output, no side effects — the property that makes reducers trivially testable." },
        { term: "Immutability", definition: "Reducers return NEW state objects (spread), never mutate the old — React detects change by reference." },
      ], [
        "Five terms — the reducer contract.",
        "A reducer is one pure function that receives current state and an action, and returns the next state.",
        "An action is a plain object describing what happened — events, not instructions.",
        "dispatch is how you file that event — dispatch and React runs the reducer.",
        "Purity is the superpower: same inputs, same output, no side effects — testable without React.",
        "And immutability is the mechanical rule: return new objects, never mutate — React detects change by reference.",
      ], "purple"),
      code("cartReducer.ts", [
        "function cartReducer(state, action) {",
        "  switch (action.type) {",
        "    case 'add': {",
        "      const exists = state.items.find(i => i.id === action.item.id);",
        "      if (exists) return state;   // no duplicates",
        "      return { ...state, items: [...state.items, action.item] };",
        "    }",
        "    case 'remove':",
        "      return { ...state, items: state.items.filter(i => i.id !== action.id) };",
        "    default:",
        "      return state;",
        "  }",
        "}",
      ], [
        "A real reducer with real rules — read the shape, not just the syntax.",
        "The switch on action.type is the standard anatomy: every transition, findable in one place.",
        "The add case contains a BUSINESS RULE: no duplicate items. In useState-land, that rule would live in a click handler — invisible and untested. Here it is explicit, enforced, and testable.",
        "Both cases return NEW state via spread — the immutability contract. Never push, never mutate.",
        "And the default returns state unchanged — unknown actions are ignored, not crashes.",
      ], "purple"),
      code("testing-the-reducer.ts", [
        "import { renderHook, act } from '@testing-library/react';",
        "",
        "// pure logic = test WITHOUT any rendering",
        "test('add rejects duplicates', () => {",
        "  let state = { items: [{ id: 1 }] };",
        "  state = cartReducer(state, { type: 'add', item: { id: 1 } });",
        "  expect(state.items).toHaveLength(1);",
        "});",
        "",
        "// same function, same action, same result. Every time.",
      ], [
        "Purity pays off the moment you test.",
        "A reducer is a function from inputs to outputs — no rendering, no mocks, no DOM. Call it with a state and an action; assert the result.",
        "The duplicate-rejection rule that was invisible in a click handler is now three lines of test.",
        "This is the architectural payoff: business rules become visible, located, and verified — instead of scattered across event handlers hoping nothing calls them out of order.",
      ], "purple"),
      compare("useState vs useReducer", {
        title: "useState", points: ["Independent values", "Simple set-and-forget updates", "Logic lives in event handlers", "Perfect for small, local state"],
      }, {
        title: "useReducer", points: ["Interrelated values with rules", "All transitions in one pure function", "Rules become visible + testable", "Worth it when updates interact"],
        accent: "cyan",
      }, [
        "The honest choice, not the fashionable one.",
        "useState is right most of the time: independent values, simple updates, local scope. Do not reducer-ify a boolean.",
        "useReducer earns its keep when updates interact: cart rules, multi-step forms, anything where one action must change several values consistently.",
        "The smell that says reducer: the same rule re-implemented in three handlers, or a state change that requires updating two variables in lockstep. That is a state machine asking to exist.",
      ], "purple"),
      scenario(
        "Case study · the multi-step form",
        "A five-step checkout: step, shipping, payment, promo — four useState calls. Bug reports: users see step 4 with step-2 data; the promo code sometimes applies twice. Every handler patches a different pair of values.",
        "The refactor to one reducer with actions like NEXT_STEP, SET_SHIPPING, APPLY_PROMO made the rules explicit: NEXT_STEP validates the current step's fields first; APPLY_PROMO checks applied === false. Every transition enforced the invariants.",
        "Bugs of inconsistency are not UI bugs — they are state-machine bugs. The reducer made the machine visible, and the machine could finally be tested.",
      ),
      quiz(
        "What makes a reducer 'pure', and why does it matter?",
        ["Same inputs always produce the same output with no side effects — testable without React", "It never re-renders", "It cannot throw errors", "It runs in a worker"],
        0,
        "Purity means deterministic: state + action in, next state out, nothing else. That lets you test every business rule as a plain function call — no rendering, no mocks.",
        [
          "Knowledge check — what purity buys you.",
        ],
        "purple"
      ),
      recap([
        "Reducer: (state, action) → nextState — one pure function owns all transitions.",
        "Actions are events: { type: 'add', item } — dispatch them, never set scattered state.",
        "Business rules live IN the reducer — visible, located, testable.",
        "Immutability: spread to new objects; React detects change by reference.",
        "useState by default; useReducer when updates have rules that interact.",
      ], [
        "What you now know.",
        "You can now architect state, not just store it: transitions as typed actions, rules as tested code, consistency by construction.",
        "Next lesson: React Router — URLs that map to components.",
      ], "purple"),
    ],
  },
  {
    lessonId: "les-rf-3-1", lessonTitle: "React Router v6", courseId: "course-react-frontend",
    scenes: [
      title(
        "React Router v6",
        "react fundamentals · client-side routing",
        "URLs that map to components — real navigation without page reloads",
        [
          "Single-page apps still need real URLs — shareable, back-button-respecting, deep-linkable. React Router is the standard mapping between paths and components.",
        ],
        "amber",
        [
          "Configure routes: paths, dynamic segments, 404s",
          "Navigate with Link and useNavigate",
          "Read params and search params in components",
          "Protect routes with layout wrappers"
        ]
      ),
      keyterms([
        { term: "Route", definition: "A path → component mapping: /courses/:id renders Course for any id." },
        { term: "Dynamic segment", definition: ":id in a path — captured and readable via useParams." },
        { term: "Link / useNavigate", definition: "Declarative navigation (<Link to>) and programmatic (navigate('/'))." },
        { term: "Layout route", definition: "A parent route rendering an <Outlet /> — shared chrome around nested pages." },
        { term: "Loader (data router)", definition: "Fetch data DURING navigation — the component renders with data already present." },
      ], [
        "Five terms cover the router's surface.",
        "A route maps a path pattern to a component — the declaration is the whole app's URL structure.",
        "Dynamic segments capture variable parts: colon-id matches any course id.",
        "Link is navigation as markup; useNavigate is navigation as code — after a form submits, say.",
        "Layout routes render shared chrome once — navbar and sidebar — with Outlet marking where nested pages appear.",
        "And loaders flip data-fetching to navigation time, so components arrive with their data.",
      ], "amber"),
      code("routes.tsx", [
        "import { createBrowserRouter, RouterProvider } from 'react-router-dom';",
        "",
        "const router = createBrowserRouter([",
        "  {",
        "    path: '/', element: <Layout />,   // navbar + <Outlet />",
        "    children: [",
        "      { index: true, element: <Home /> },",
        "      { path: 'courses', element: <Courses /> },",
        "      { path: 'courses/:id', element: <Course />, loader: courseLoader },",
        "      { path: '*', element: <NotFound /> },",
        "    ],",
        "  },",
        "]);",
      ], [
        "The modern router configuration — read it as your app's URL map.",
        "createBrowserRouter takes a tree. The root is a Layout — the shared navbar and footer — whose Outlet renders the children.",
        "Index means 'at the parent's exact path' — the home page. Courses lists; courses slash colon-id captures the dynamic segment for the detail page.",
        "The loader on the detail route fetches during navigation — Course renders with data in hand, no spinners.",
        "And the star catches everything unmatched — your 404.",
      ], "amber"),
      code("Course.tsx — reading the URL", [
        "import { useParams, useSearchParams, Link } from 'react-router-dom';",
        "",
        "function Course() {",
        "  const { id } = useParams();               // /courses/:id",
        "  const [params] = useSearchParams();       // ?tab=syllabus",
        "  const tab = params.get('tab') ?? 'about';",
        "",
        "  return (",
        "    <Link to={`/courses/${id}/enroll`}>Enroll</Link>",
        "  );",
        "}",
      ], [
        "Inside a routed component, the URL becomes data.",
        "useParams returns the captured segments — the id from the path, ready to fetch with.",
        "useSearchParams reads the query string — filter and tab state that deserves to live in the URL, shareable and back-button-proof.",
        "And Link builds internal navigation — never a plain anchor for app routes, because a full reload throws away all state.",
      ], "amber"),
      scenario(
        "Case study · the protected dashboard",
        "Requirement: /dashboard only for logged-in users; everyone else redirected to /login. Naive approach: an if-check inside every page component.",
        "The Router v6 answer: a ProtectedLayout route — a component that checks auth ONCE and renders either <Outlet /> for the authenticated children or <Navigate to=\"/login\" /> for everyone else. Every child route inherits the protection by structure.",
        "Protection by composition, not repetition: one wrapper, applied structurally. The same pattern later wraps role-based admin routes — one more layout, zero new page code.",
      ),
      quiz(
        "What is the difference between <Link to='/courses'> and <a href='/courses'>?",
        ["Link updates the URL and renders the router's match WITHOUT a page reload; a reloads the whole app", "They are identical", "a is faster", "Link only works in dev"],
        0,
        "A full anchor navigation re-fetches everything and remounts the app — all state lost. Link performs client-side navigation: URL changes, router swaps components, state survives.",
        [
          "Knowledge check — what does 'client-side routing' actually save?",
        ],
        "purple"
      ),
      recap([
        "createBrowserRouter: a tree of path → element mappings with a Layout + Outlet root.",
        ":params via useParams; query strings via useSearchParams — URL as data.",
        "Link for markup, useNavigate for code — never plain anchors inside the app.",
        "Loaders fetch during navigation — components arrive with data.",
        "ProtectedLayout guards children by structure — auth once, inherited everywhere.",
      ], [
        "What you now know.",
        "Routing is now structural: URL maps, dynamic segments, protected layouts — the skeleton of a multi-page app in a single-page world.",
        "Next lesson: forms and APIs — getting real data in and out.",
      ], "amber"),
    ],
  },
  {
    lessonId: "les-rf-4-1", lessonTitle: "Controlled vs Uncontrolled Forms", courseId: "course-react-frontend",
    scenes: [
      title(
        "Controlled vs Uncontrolled Forms",
        "react fundamentals · forms & input",
        "React state as the single source of truth — instant validation, derived UI, no DOM spelunking",
        [
          "Forms are where React's declarative model pays its rent: every keystroke is state, and everything — validation, button states, summaries — derives from it.",
        ],
        "cyan",
        [
          "Build controlled inputs: value + onChange",
          "Derive UI from form state: errors, disabled buttons",
          "Know when uncontrolled inputs are the right call",
          "Submit cleanly with preventDefault and typed payloads"
        ]
      ),
      keyterms([
        { term: "Controlled input", definition: "An input whose value comes from React state and reports changes via onChange." },
        { term: "Uncontrolled input", definition: "A default-value input read at submit time (via ref) — the DOM holds the value." },
        { term: "Derived state", definition: "UI computed from state during render: errors, button disabled, character counts." },
        { term: "preventDefault", definition: "Stops the browser's full-page form submission so React handles it." },
        { term: "Form state shape", definition: "One object in one useState: { email: '', password: '' } — updates via spread." },
      ], [
        "Five terms, one decision: who owns the value?",
        "A controlled input's value LIVES in React state — the DOM is just a view of it.",
        "An uncontrolled input keeps its value in the DOM, read once at submit via a ref.",
        "Derived state is the payoff: errors, disabled buttons, live summaries — all computed from the form state during render.",
        "preventDefault is the handshake: stop the browser's reload, let React take the submission.",
        "And the shape: one state object for the whole form, updated by spread — not twelve separate useStates.",
      ], "cyan"),
      code("LoginForm.tsx", [
        "const [form, setForm] = useState({ email: '', password: '' });",
        "const emailError = form.email && !form.email.includes('@')",
        "  ? 'Enter a valid email' : '';",
        "",
        "<form onSubmit={(e) => { e.preventDefault(); submit(form); }}>",
        "  <input",
        "    value={form.email}",
        "    onChange={(e) => setForm({ ...form, email: e.target.value })}",
        "  />",
        "  {emailError && <p className=\"error\">{emailError}</p>}",
        "  <button disabled={!form.email || !form.password}>Sign in</button>",
        "</form>",
      ], [
        "The controlled pattern, complete, in fifteen lines.",
        "One state object holds both fields. Updates spread the old form and override one key — the immutable-update habit from the reducer lesson.",
        "Validation is DERIVED, not stored: emailError is computed during render from the current value. No effect, no sync bug — the error cannot be stale because it does not exist between renders.",
        "Submit prevents the default and hands the form object to submit — one typed payload, no FormData parsing.",
        "The button derives its own disabled state: no email or no password, no clicking. UX that updates itself.",
      ], "cyan"),
      flow("The Controlled Loop", {
        type: { label: "Keystroke", x: 100, y: 190, shape: "square" },
        change: { label: "onChange fires", x: 300, y: 190, shape: "square" },
        state: { label: "setState", x: 500, y: 190, shape: "square", emphasis: true },
        render: { label: "Re-render + derive", x: 680, y: 190, shape: "square" },
      }, [
        { from: "type", to: "change", speed: 1.2 },
        { from: "change", to: "state", speed: 1.2 },
        { from: "state", to: "render", speed: 1.2 },
        { from: "render", to: "change", speed: 1.2 },
      ], [
        "Every keystroke runs this loop — and understanding it ends the 'controlled inputs are slow' myth.",
        "The key fires onChange, which calls setState. React re-renders the component, deriving errors and button states from the new value.",
        "React batches these updates efficiently — modern React handles hundreds of controlled inputs without breaking a sweat.",
        "The loop's real gift is the rightmost box: every keystroke re-derives ALL the UI. Validation, button states, summaries — consistent by construction, never manually synced.",
      ], "Keystroke → state → derive everything", "cyan"),
      compare("Controlled vs Uncontrolled", {
        title: "Controlled", points: ["Value in React state", "Instant validation + derived UI", "Best for real forms", "Re-renders per keystroke"],
      }, {
        title: "Uncontrolled", points: ["Value in the DOM, read via ref", "Zero re-renders while typing", "Best for huge inputs, file fields", "No live validation"],
        accent: "green",
      }, [
        "The honest split — and the default.",
        "Controlled is the default for real forms: validation, conditional fields, and derived UI all require state ownership.",
        "Uncontrolled wins for the edge cases: enormous text areas where per-keystroke renders are wasteful, and file inputs where the value is unreadable anyway.",
        "There is a third way worth knowing: libraries like react-hook-form keep inputs uncontrolled for performance but give you controlled-style validation and errors. Production React usually ships one of these.",
      ], "cyan"),
      scenario(
        "Case study · the two-sources-of-truth bug",
        "A signup form stores email in state AND reads it back from the input on submit. Users report: 'it says my email is invalid but sends it anyway.'",
        "The two sources diverged: the validation read the state, but a custom autocomplete wrote directly to the DOM input — bypassing onChange. State said one thing, the DOM said another, and the submit read the DOM.",
        "The fix — remove every direct DOM read; the input renders FROM state and reports THROUGH onChange — restored one source of truth. The meta-rule: in React, if two places can disagree about a value, they eventually will.",
      ),
      quiz(
        "Why is validation as derived state (computed in render) better than storing errors in state?",
        ["It can never be stale — it recomputes from the current value on every render", "It is faster", "It uses less memory", "It disables the button"],
        0,
        "Stored errors must be manually updated and can drift out of sync with the input. Derived errors cannot drift — they exist only as a function of the current value.",
        [
          "Knowledge check — one source of truth, everything derived.",
        ],
        "purple"
      ),
      recap([
        "Controlled = value from state + onChange reporting — the default for real forms.",
        "Derive everything from form state: errors, disabled buttons, summaries.",
        "One state object, updated by spread — not twelve separate useStates.",
        "preventDefault hands the submission to React with a typed payload.",
        "Uncontrolled (refs, react-hook-form) for huge inputs and file fields.",
      ], [
        "What you now know.",
        "Forms are now declarative: one source of truth, everything derived, zero DOM spelunking.",
        "Next lesson: performance — memoization and the profiler.",
      ], "cyan"),
    ],
  },
  {
    lessonId: "les-rf-5-1", lessonTitle: "React.memo, useMemo, useCallback", courseId: "course-react-frontend",
    scenes: [
      title(
        "Performance: memo, useMemo, useCallback",
        "react fundamentals · render less, do less",
        "Three tools that skip work React would repeat — and the profiler that tells you when",
        [
          "React re-renders liberally, and that is usually fine. But when a profiler shows real cost, three tools skip the work — used correctly, they are surgical; used blindly, they are bugs in waiting.",
        ],
        "green",
        [
          "Read the Profiler and find expensive renders",
          "Apply React.memo to components that re-render identically",
          "Cache expensive computations with useMemo",
          "Stabilize callbacks with useCallback — and know why they pair"
        ]
      ),
      keyterms([
        { term: "React.memo", definition: "Wraps a component: skips re-render if props are shallowly equal." },
        { term: "useMemo", definition: "Caches a computed VALUE between renders: useMemo(() => heavy(x), [x])." },
        { term: "useCallback", definition: "Caches a FUNCTION identity between renders — keeps props stable for memoized children." },
        { term: "Shallow compare", definition: "memo compares props by === — new object/array/function references count as 'changed'." },
        { term: "Profiler", definition: "DevTools tool that measures every render's cost — where optimization is justified." },
      ], [
        "Five terms, one discipline: measure first.",
        "React.memo skips a component's re-render when its props are shallowly equal.",
        "useMemo caches a computed value — the expensive sort, the filtered list — until its inputs change.",
        "useCallback caches a function's IDENTITY — same function object across renders.",
        "Shallow compare is the fine print: memo compares with triple-equals, so a fresh object or function prop defeats it every time.",
        "And the Profiler is the judge: it measures every render, and only its evidence justifies reaching for the other three.",
      ], "green"),
      code("OptimizedTable.tsx", [
        "const Row = React.memo(function Row({ item, onPick }) {",
        "  return <li onClick={() => onPick(item.id)}>{item.name}</li>;",
        "});",
        "",
        "function Table({ items, pick }) {",
        "  const sorted = useMemo(",
        "    () => [...items].sort(byName),   // cache the sort",
        "    [items]",
        "  );",
        "  const handlePick = useCallback((id) => pick(id), [pick]);",
        "  return <ul>{sorted.map(i => <Row key={i.id} item={i} onPick={handlePick} />)}</ul>;",
        "}",
      ], [
        "The three tools working as a team on one list.",
        "Row is memoized: with a thousand rows, typing in an unrelated input re-renders the Table — but zero Rows, because their props are unchanged.",
        "sorted is memoized: the sort runs only when items change, not on every render of the Table.",
        "And here is the pairing that beginners miss: handlePick is useCallback-wrapped BECAUSE Row is memo-wrapped. Without it, every render creates a fresh function, the shallow compare fails, and memo does nothing. The two tools are a set.",
        "One changed item, one re-render — instead of a thousand.",
      ], "green"),
      compare("Memoize Everything vs Measure First", {
        title: "Memo by default", points: ["useMemo/useCallback everywhere", "Every component memo-wrapped", "Code is harder to read", "Bugs from stale cache arrays"],
      }, {
        title: "Profile, then optimize", points: ["Profiler shows the real cost", "Optimize the actual hotspot", "Code stays simple", "Memoization with a measured reason"],
        accent: "cyan",
      }, [
        "The discipline that separates performance work from superstition.",
        "Memo-everything adds mental overhead — every dependency array is a chance to be wrong — while most renders were cheap anyway.",
        "The professional loop: open the Profiler, record the slow interaction, read the render costs. Usually one or two components dominate.",
        "Optimize exactly those, with a comment naming the measured reason. Performance work without measurement is not optimization — it is decoration with dependency arrays.",
      ], "green"),
      scenario(
        "Case study · the input that lagged",
        "A course catalog with 2,000 rows: typing in the search box lagged visibly. The Profiler showed why — every keystroke re-rendered all 2,000 Rows plus re-sorted the list.",
        "The fix was the trio, applied surgically: memo on Row, useMemo on the filtered+sorted list (depending on items and query), useCallback on the row click handler.",
        "Result: each keystroke re-renders the input, the table shell, and only the rows whose content changed — measured, in the Profiler, at 16ms. The lag was never 'React is slow'; it was a thousand renders that no one had measured.",
      ),
      quiz(
        "Row is wrapped in React.memo, but its parent passes onPick={() => doThing(id)} inline. What happens?",
        ["memo is defeated — a new function reference every render still re-renders every Row", "memo still works", "Only Row re-renders", "React throws an error"],
        0,
        "Shallow compare sees a brand-new function each render and re-renders anyway. Stabilize with useCallback — memo and useCallback are a paired tool.",
        [
          "Knowledge check — what does shallow compare actually compare?",
        ],
        "purple"
      ),
      recap([
        "Measure first: Profiler records render costs — optimize the hotspot, not the habit.",
        "React.memo skips re-renders on shallow-equal props; new functions/objects defeat it.",
        "useMemo caches expensive values; useCallback stabilizes function identities.",
        "memo + useCallback are a pair — one without the other is wasted effort.",
        "Dependency arrays are the correctness contract — stale ones cause stale-UI bugs.",
      ], [
        "What you now know.",
        "The optimization trio — with the discipline that makes them safe: measure, fix the hotspot, and keep the code simple.",
        "Next lesson: TypeScript in React — catching the bugs before the profiler even runs.",
      ], "green"),
    ],
  },
  {
    lessonId: "les-rf-7-1", lessonTitle: "Types for Props, State & Events", courseId: "course-react-frontend",
    scenes: [
      title(
        "TypeScript in React",
        "react fundamentals · type safety",
        "Props, state, and events with types — the compiler as your first reviewer",
        [
          "TypeScript turns a class of React bugs from production incidents into red squiggles. This lesson types the three things every component has: props, state, and events.",
        ],
        "amber",
        [
          "Type props with interfaces and unions",
          "Type state with useState generics",
          "Type events correctly per element",
          "Derive API types instead of hand-writing them"
        ]
      ),
      keyterms([
        { term: "Props interface", definition: "The typed contract of a component's inputs — wrong usage becomes a compile error." },
        { term: "Union type", definition: "'learner' | 'admin' — a value that may be exactly one of a fixed set. Perfect for roles and statuses." },
        { term: "Optional prop", definition: "name?: string — may be absent; the type system forces you to handle that." },
        { term: "Event types", definition: "React.ChangeEvent<HTMLInputElement>, React.FormEvent — typed events so e.target always knows what it is." },
        { term: "Generic state", definition: "useState<Item[]>([]) — state typed from day one, not inferred from null." },
      ], [
        "Five terms — the React TypeScript starter kit.",
        "The props interface is the component's contract: every misuse is a compile error instead of a runtime surprise.",
        "Union types nail down fixed sets: a role is 'learner' or 'admin', never 'administartor'.",
        "Optional props declare themselves honestly — and force handling of the absent case.",
        "Event types make e.target intelligent: a ChangeEvent on an HTMLInputElement KNOWS its value is a string.",
        "And generic state types the value from the first render — no fighting inference from null.",
      ], "amber"),
      code("UserCard.tsx", [
        "interface UserCardProps {",
        "  user: {",
        "    id: string;",
        "    name: string;",
        "    role: 'learner' | 'instructor' | 'admin';   // union",
        "  };",
        "  onSelect?: (id: string) => void;   // optional callback",
        "}",
        "",
        "export function UserCard({ user, onSelect }: UserCardProps) {",
        "  return <button onClick={() => onSelect?.(user.id)}>…</button>;",
        "}",
      ], [
        "The props contract, written down and enforced.",
        "The interface names the shape: id and name as strings, and role as a union of exactly three values.",
        "The union pays off immediately: anywhere that switches on role, TypeScript knows the complete set — miss a case and the compiler says so.",
        "onSelect is optional — the question mark is honesty. The component handles its absence with optional chaining: onSelect? dot call.",
        "Every consumer of UserCard now gets autocomplete AND compile-time checking. The interface is documentation that cannot rot.",
      ], "amber"),
      code("events.tsx", [
        "// input events know their element",
        "<input onChange={(e: React.ChangeEvent<HTMLInputElement>) =>",
        "  setEmail(e.target.value)      // .value: string ✓",
        "} />",
        "",
        "// form submit",
        "<form onSubmit={(e: React.FormEvent) => { e.preventDefault(); … }} />",
        "",
        "// typed state from the start",
        "const [courses, setCourses] = useState<Course[]>([]);",
        "setCourses([{ id: 'c1', title: 'Networking' }]);  // ✓ checked",
      ], [
        "Events and state, typed.",
        "The ChangeEvent is generic over its element — on an input, e.target.value is a string, with autocomplete and no any-casts.",
        "FormEvent covers submissions — preventDefault is typed and present.",
        "And useState with an explicit generic types the array from the first render. setCourses now rejects anything that is not a Course — the typo'd field, the missing id, the wrong type: all compile errors.",
        "This is the quiet superpower: your tests for typos are now the compiler's job, running on every save.",
      ], "amber"),
      scenario(
        "Case study · the typo that TypeScript kills",
        "A course platform renders lessons with lesson.titel — a typo against the real field title. Plain JS: undefined renders as nothing; the bug ships, three sprints later someone notices the empty headings.",
        "With TypeScript, the moment lesson.titel is typed against the Lesson interface, the red squiggle appears before the file is even saved: 'Property titel does not exist. Did you mean title?'",
        "No test suite catches bugs this cheaply. The type system is a reviewer that reads every line, on every save, for free — and never gets tired.",
      ),
      quiz(
        "What does role: 'learner' | 'admin' give you that role: string does not?",
        ["A closed set — typos and invalid values become compile errors, and switch statements are exhaustiveness-checked", "Better performance", "Smaller bundle", "It allows any casing"],
        0,
        "The union restricts values to the exact set. 'Admin' with a capital letter, 'admn', or a new surprise value are all compile errors — and every switch over role can be checked for missing cases.",
        [
          "Knowledge check — closed sets catch typos and drift.",
        ],
        "purple"
      ),
      recap([
        "Props get an interface — the contract the compiler enforces on every consumer.",
        "Unions for fixed sets: 'learner' | 'admin' beats string, always.",
        "Optional props (?) declare absence honestly — handle them with ?.",
        "Type events per element: ChangeEvent<HTMLInputElement> knows its value.",
        "Type state with generics: useState<Course[]>([]) — checked from day one.",
      ], [
        "What you now know.",
        "Props, state, and events are now typed — the compiler reviews your React on every save, catching the typo class of bugs before they ship.",
        "This completes the React course core. The capstone dashboard ahead uses every pattern from these lessons.",
      ], "amber"),
    ],
  },
];
