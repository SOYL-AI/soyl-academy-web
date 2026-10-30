# CBSE Class 12 Computer Science, Chapter 6 — Computer Networks

`cbse-12-computer-science-ch06` · release v1 · academic year 2026-27 · family `computer-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) to the standard of `cbse-12-computer-science-ch01`. Built from `src/`: run `npx tsx content/authored/computer-science/cbse-12-computer-science-ch06/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

The build runs these checks before it writes `release.json` and `tests.json`:
- schema validation;
- pipeline lint and deterministic verify;
- word limits, narration rules and the answer-leak scan;
- the editorial counts;
- the stem-duplicate check against every other authored chapter.

The chapter has no program output, so **no Python is run** and there is no `py-cache.json`. Every number is computed in `questions.mjs` and checked with `assert`.

| File | What |
|---|---|
| `release.json` | 2 decks of 20 + 20 slides with 30 visuals (5 SVG: timeline, bus, star and tree topologies, and a campus plan; the rest tables and flows); 6 notes sections; 31 flashcards; 80 questions worth 138 marks |
| `tests.json` | `t_cbse12computerscience_ch06_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12computerscience_ch06_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`. Both follow their blueprint item for item, including the internal-choice groups. They are disjoint, use no deck-check item, and Section D is case-based in both. |
| `src/` | `lib.mjs` (the shared CBSE 12 library, unchanged), `questions.mjs`, `build.mjs` |

## Scope

All five syllabus topics are covered:
- **t01** evolution and data communication: ARPANET, TCP/IP, NSFNET, Internet, WWW; components; bandwidth and data transfer rate; IP addresses; circuit and packet switching.
- **t02** wired and wireless media; modem, NIC, RJ45, repeater, hub, switch, router, gateway, Wi-Fi card.
- **t03** PAN, LAN, MAN, WAN; bus, star and tree topologies; campus network design.
- **t04** HTTP, HTTPS, FTP, SMTP, POP3, PPP, TELNET, VoIP, TCP/IP.
- **t05** WWW, HTML and XML, domain names and DNS, URL, website, browser, server, hosting.

### Decks

| Part | Slides | Checks | Worked examples |
|---|---|---|---|
| 1 | 20 | 4 | transfer-time calculation; matching needs to media |
| 2 | 20 | 4 | a full campus design for the imagined Sahyadri Junior College, over two slides |

Narration is at most 70 words per slide (mean 52) and uses no symbols. "RJ45", "POP3" and "IPv4" are spelt out in words in narration.

### Question bank (80 items)

| Type | Count |
|---|---|
| mcq | 35 |
| assertion-reason | 6 |
| true-false | 5 |
| fill-blank | 2 |
| match | 2 |
| ordering | 1 |
| numerical | 5 |
| short 2-mark | 9 |
| short 3-mark | 5 |
| long 5-mark | 6 |
| case-based | 4 |

- **Case-based items:** four imagined campuses (a school, a seed company, a hospital and a polytechnic), each with a distance table, the repeater rule stated in the passage, and an internal choice in part (c).
- **Difficulty:** d1 15, d2 31, d3 32, d4 2.
- **Competency:** recall 8, understanding 28, application 23, analysis 20, evaluation 1. That puts 55% of items at application or above.

## Data and facts

- **Figures computed in `questions.mjs`:**
  - Transfer times: 600 KB × 8 ÷ 48 Kbps = 100 s; 12 MB × 8 ÷ 4 Mbps = 24 s; 1,800 Kb ÷ 60 Kbps = 30 s.
  - Rate: 9,000 bits ÷ 1.5 s = 6,000 bps.
  - Conversion: 3 Mbps × 1024 = 3,072 Kbps. Each stem states the conversion it uses.
  - Campus answers: the server goes in the block with the most computers, the layout is a star from it, and a repeater goes on any run longer than the limit given in the passage. These are asserted for every campus.
- **Dates:** ARPANET 1969, TCP/IP adopted 1983, NSFNET 1986, the Web proposed at CERN in 1989.
- **Address sizes:** IPv4 is 32 bits (about four billion addresses), IPv6 128 bits.
- **Not stated:** there are no current statistics.

## For a reviewer

- **Repeater rule:** the distance limit is given in each case passage as 90 m, so the answer never depends on the 70 m or 100 m figures that different books quote. The campus-design convention is to place the server where most computers are and lay a star from it.
- **Unit convention:** the 1024 step is stated only where a conversion is asked. Other transfer-time items keep the same prefix on both sides, so neither convention is needed.
- **Gateway:** described as joining networks with different protocols; the router as choosing routes between networks.
- **Spares:** `l_topologies`, `cb_neelgiri`, `s_comm_parts`, `s_bus_star`, `s_wireless_choice` and `s3_ipv4_ipv6` are in the bank but in neither test. `l_campus` reuses the Neelgiri data with different questions.
- **Rendering:** nobody has seen the SVGs rendered, so they should be checked at 360 px on staging. A script check found no label overflow or overlap.
