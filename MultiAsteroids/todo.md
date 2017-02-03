Need to do:
- Asteroids have velocity in world pos
- Asteroids can collide with each other
- Asteroids don't generate on top of each other
- Ship shoots lasers
- Ship dies when it hits an asteroid
- Lasers make asteroids smaller to a certain point then destroy them
- Objects to pick up to generate currency
- Upgrades based on currency


- Objects render based on worldPos
- Server keeps track of worldPos or all objects
- Client renders objects in view
- Client passes back newObject information (new lasers, shoots or crashes with asteroid, picks up currency, shoots another ship)
- Server updates arrays based on client-sent data
