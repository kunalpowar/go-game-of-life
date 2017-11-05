package main

// Rules:
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

type coord struct {
	x, y int
}

func (c *coord) valid(size int) bool {
	return c.x > -1 && c.y > -1 && c.x < size && c.y < size
}

type universe struct {
	prev    map[coord]struct{}
	current map[coord]struct{}
	Size    int
}

func (u *universe) String() string {
	s := ""
	for row := 0; row < u.Size; row++ {
		for col := 0; col < u.Size; col++ {
			if _, alive := u.current[coord{row, col}]; alive {
				s += " * "
			} else {
				s += " - "
			}
		}
		s += "\n"
	}

	return s
}

func (u *universe) iterate() {
	u.prev = make(map[coord]struct{})
	for k := range u.current {
		u.prev[k] = struct{}{}
	}
	u.current = make(map[coord]struct{})

	var aliveN int

	for row := 0; row < u.Size; row++ {
		for col := 0; col < u.Size; col++ {
			c := coord{row, col}

			aliveN, _ = u.neighbours(c.x, c.y)

			if _, alive := u.prev[c]; alive {
				if aliveN == 2 || aliveN == 3 {
					u.current[c] = struct{}{}
				}
			} else {
				if aliveN == 3 {
					u.current[c] = struct{}{}
				}
			}
		}
	}
}

func (u *universe) neighbours(row, col int) (int, int) {
	nCells := []coord{
		{row - 1, col - 1}, {row - 1, col}, {row - 1, col + 1},
		{row, col - 1}, {row, col + 1},
		{row + 1, col - 1}, {row + 1, col}, {row + 1, col + 1},
	}

	var (
		alive int
		dead  int
	)

	for i := range nCells {
		if !nCells[i].valid(u.Size) {
			continue
		}

		if _, present := u.prev[nCells[i]]; present {
			alive += 1
		} else {
			dead += 1
		}
	}

	return alive, dead
}

func (u *universe) delta() ([]coord, []coord) {
	var (
		live []coord
		die  []coord
	)

	for c := range u.current {
		if _, alive := u.prev[c]; !alive {
			live = append(live, c)
		}
	}

	for c := range u.prev {
		if _, alive := u.current[c]; !alive {
			die = append(die, c)
		}
	}

	return live, die
}

func newUniverse(size int) universe {
	return universe{
		prev:    make(map[coord]struct{}),
		current: make(map[coord]struct{}),
		Size:    size,
	}
}
