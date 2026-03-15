- Place a header component spaning the full width of the main view window. Useful for displaying the title of the chat, or the name of the user, etc.
- Implement typing effect on the ai message canvas. Make it look like the ai is typing the message.
- Implement .md preview formatting of ai response in canva.
- Implement point accumulation. Scale: 1 -- 5 points per prompt. Passive prompts 0 point. Very active prompts 5 points, with a "prasise" message preceeding the ai response.
- Add this point to the chat points display in the chat item in the sidebar.
- Make sure the chat item points add up to the total history points.
- Specify how many points (total history points) make a gold badge or a star. Based on this, update the % value in the circular progress bar in the side bar. Find a place to say, you are x% away from the next badge. Or you are y% away from earning your first start.
- When bar is full (100%), add a new badge or star to the user's profile/sidebar.

### Clean up (continue/verify):

- On sumbit, add beautiful Loader (maintaining app color theme) to show user that the ai is thinking.
- On submit, the user message should appear immediately, not after the ai response is returned.
- layout: user message above, right aligned to the input box, and the ai message below, left aligned to the input box and spans same length as the input box, with meaningful top and bottom margins.
- user message should have backgound color: #38384D
- ai message should not have any backgound colors.
- on AI message response, implement a writing effect, similar to the one in gpt.
- New Chat button clicked: leaves the input box fixed to the bottom of the page. Needs to restore it to the center page (vertically, and horizontally). And should restore the usual headeres and texts above the input box, along with every other component on main window on initial view.
- On submit, ensure smooth animation of the input box to the bottom of the page.
- persist stores/states on local storage, and provide a command in package.json to clear the local storage.
- directly below the user message, aligned to the left: add a small label showing the promptPoint value (e.g. "5 points").

When you ae done, review the code and confirm no bugs exists. Make no mistakes.

### Next: (The engagement feature)

- Add "engage" prompt to each ai reponse to enable user engage (summarize, ask questions, paraphrase, etc.) for extra points.

### Next: Users (Not a must for demo)

- Implement auth (signup and login)
- Assign chats to different users
- Users can only see their own chats
