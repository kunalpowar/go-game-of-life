package gol

// Rules:
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

type Coord struct {
	X, Y int
}

func (c *Coord) valid(size int) bool {
	return c.X > -1 && c.Y > -1 && c.X < size && c.Y < size
}

type Universe struct {
	prev    map[Coord]struct{}
	current map[Coord]struct{}
	Size    int
}

func (u *Universe) Iterate() {
	u.prev = make(map[Coord]struct{})
	for k := range u.current {
		u.prev[k] = struct{}{}
	}
	u.current = make(map[Coord]struct{})

	var aliveN int

	for row := 0; row < u.Size; row++ {
		for col := 0; col < u.Size; col++ {
			c := Coord{row, col}

			aliveN, _ = u.neighbours(c.X, c.Y)

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

func (u *Universe) neighbours(row, col int) (int, int) {
	nCells := []Coord{
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
			alive++
		} else {
			dead++
		}
	}

	return alive, dead
}

func (u *Universe) Delta() (live []Coord, dead []Coord) {
	for c := range u.current {
		if _, alive := u.prev[c]; !alive {
			live = append(live, c)
		}
	}

	for c := range u.prev {
		if _, alive := u.current[c]; !alive {
			dead = append(dead, c)
		}
	}

	return
}

func New(size int) Universe {
	return Universe{
		prev:    make(map[Coord]struct{}),
		current: make(map[Coord]struct{}),
		Size:    size,
	}
}

func (u *Universe) AddSeed(row, col int) {
	u.current[Coord{X: row, Y: col}] = struct{}{}
}
