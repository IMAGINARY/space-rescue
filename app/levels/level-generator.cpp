#include <stdio.h>

#include <vector>

#include <cstdlib>

#include <cstdlib>

#include <time.h>

#include <queue>

#include <set>

using namespace std;

int size = 7;
int maxdepth = 5;
int cdepth = 0;
int nfields = 10;
int solvesteps = 100000;

int oo = 1 << 30;
char field[100][100];
char fieldbackup[100][100];

struct moveoption {
  int x0, y0, x1, y1, priority, dx, dy;
  moveoption(int x0, int y0, int x1, int y1, int priority): x0(x0), y0(y0), x1(x1), y1(y1), priority(priority), dx((x0 == x1) ? 0 : (x0 < x1 ? 1 : -1)), dy((y0 == y1) ? 0 : (y0 < y1 ? 1 : -1)) {}
  moveoption(int x0, int y0, int x1, int y1): x0(x0), y0(y0), x1(x1), y1(y1), priority(1), dx((x0 == x1) ? 0 : (x0 < x1 ? 1 : -1)), dy((y0 == y1) ? 0 : (y0 < y1 ? 1 : -1)) {}
};

bool done = false;

typedef long long int ll;
typedef pair < int, ll > intll;
ll bestfield;
int bestfieldn;
int bestdepth;
vector < moveoption > possible_moves;
int probs = 0;

int solve_it(ll idx, unsigned int mw);
ll field2ll();
void ll2field(ll l);
void do_backward_move(moveoption m);
void go_backward();

int try_it(moveoption m) {
	for (int i = 0; i < size; i++) {
		for (int j = 0; j < size; j++) {
				fieldbackup[i][j] = field[i][j];
		}
	}
	do_backward_move(m);
	int n = solve_it(field2ll(), 1000);

	for (int i = 0; i < size; i++) {
		for (int j = 0; j < size; j++) {
				field[i][j] = fieldbackup[i][j];
		}
	}
	return n;
};


void print_field(bool complete) {
  for (int i = 0; i < size; i++) {
    for (int j = 0; j < size; j++)
      printf("%c", (complete && field[i][j] == ' ') ? '.' : field[i][j]);
    printf("\n");
  };
  printf("\n");
};

bool isrobot(int i, int j) {
  if (i < 0 || j < 0 || i >= size || j >= size) return false;
  return (field[i][j] == 'S' || field[i][j] == 'o');
}

bool isfree(int i, int j) {
  if (i < 0 || j < 0 || i >= size || j >= size) return false;
  return (field[i][j] == '.' || field[i][j] == ' ');
}

bool rowisfree(moveoption m) {
  //return rowisfree(m.x0, m.y0, m.x1, m.y1);
  int x = m.x0;
  int y = m.y0;
  do {
    x += m.dx;
    y += m.dy;
    if (isrobot(x, y)) return false;
  } while (x != m.x1 || y != m.y1);
  return true;
}

ll field2ll() {
  ll l = 0;
  int spos = 0;
  for (int i = 0; i < size; i++) {
    for (int j = 0; j < size; j++) {
      l = l << 1;
      if (isrobot(i, j)) l++;
      if (field[i][j] == 'S') spos = i * size + j;
    }
  }
  l = l << 8;
  l += spos;
  return l;
};

void ll2field(ll l) {
  int spos = l & 63;
  l = l >> 8;
  for (int i = 0; i < size; i++)
    for (int j = 0; j < size; j++) field[i][j] = '.';
  for (int i = size - 1; i >= 0; i--) {
    for (int j = size - 1; j >= 0; j--) {
      if (l & 1) field[i][j] = 'o';
      l = l >> 1;
    }
  }
  field[spos / size][spos % size] = 'S';
}

void consider_move(moveoption m) {
  int x = m.x0;
  int y = m.y0;
  if (m.dx > 0 && x == 0) return;
  if (m.dy > 0 && y == 0) return;
  if (m.dx < 0 && x == size - 1) return;
  if (m.dy < 0 && y == size - 1) return;
  if (field[x - m.dx][y - m.dy] == '.') return;
  if (isrobot(x - m.dx, y - m.dy)) m.priority = 2;
  int tryval = try_it(m);
  if(tryval>cdepth || tryval<0) {
	  m.priority *= 1000;
  }
  possible_moves.push_back(m);
  probs += m.priority;
};

void do_backward_move(moveoption m) {
  int x = m.x0;
  int y = m.y0;

  if (!isrobot(x - m.dx, y - m.dy)) {
    field[x - m.dx][y - m.dy] = 'o';
  }

  char r = field[x][y];
  do {
    field[x][y] = '.';
    x += m.dx;
    y += m.dy;
  } while (x != m.x1 || y != m.y1);
  field[m.x1][m.y1] = r;
}

void go_backward() {
  if (!done) {
    possible_moves.clear();
    probs = 0;
    //print_field(false);
    for (int i = 0; i < size; i++)
      for (int j = 0; j < size; j++) {
        if (isrobot(i, j)) {
          for (int x = 0; x < size; x++)
            if (x != i) {
              if (rowisfree(moveoption(i, j, x, j)))
                consider_move(moveoption(i, j, x, j));
            }
          for (int y = 0; y < size; y++)
            if (y != j) {
              if (rowisfree(moveoption(i, j, i, y)))
                consider_move(moveoption(i, j, i, y));
            }
        }
      }
    if (probs == 0) {
      done = true;
      printf("aborting at depth %d.\n", cdepth);
      print_field(true);
      return;
    }
    int r = rand() % probs;

    int cprob = 0;
    for (unsigned int k = 0; k < possible_moves.size(); k++) {
      if (r < cprob + possible_moves[k].priority) {
        do_backward_move(possible_moves[k]);
        cdepth++;
		if (cdepth < maxdepth)
			go_backward();
        break;
      }
      cprob += possible_moves[k].priority;
    }
  };
}

int main(int argc, char * argv[]) {
  if (argc != 3 && argc != 5) {
    printf("Usage: ./level-generator [SIZE] [DEPTH].\n");
    printf("    or ./level-generator [SIZE] [DEPTH] [NFIELDS] [SOLVESTEPS] for experts.\n");
    printf("Running with size 7 and depth 5.\n");
  } else {
    size = min(7, atoi(argv[1]));
    maxdepth = atoi(argv[2]);
  }
  
  if(argc == 5) {
    nfields = atoi(argv[3]);
	solvesteps = atoi(argv[4]);
  }

  //srand(time(NULL));
  struct timespec ts;
  clock_gettime(CLOCK_MONOTONIC, & ts);

  /* using nano-seconds instead of seconds */
  srand((time_t) ts.tv_nsec);

  bestfieldn = maxdepth + 10;
  bestdepth = 0;
  for (int k = 0; k < nfields; k++) { //take 1 field out of nfields that has minimal number of objects
    //initialize field
    for (int i = 0; i < size; i++)
      for (int j = 0; j < size; j++) field[i][j] = ' '; //untouched
    field[size / 2][size / 2] = 'S'; //robot
    cdepth = 0;
    go_backward();

    //printf("computed field\n");
    //print_field(false);
    
    int cn = 0;
    for (int i = 0; i < size; i++)
      for (int j = 0; j < size; j++)
        if (field[i][j] == 'o') cn++;
    ll cfield = field2ll();
    int cdepth = solve_it(cfield, solvesteps);
    if (abs(cdepth) >= abs(bestdepth) && (abs(cdepth) >abs(bestdepth) || cn < bestfieldn)) {
      bestfield = cfield;
      bestfieldn = cn;
      bestdepth = cdepth;
    }
  }
  ll2field(bestfield);
  if (bestdepth < 0) {
    printf("The best solution requires at least %d steps\n", -bestdepth);
  } else
    printf("The best solution requires exactly %d steps\n", bestdepth);

  print_field(true);
}

queue < intll > q;
set < ll > visited;

void gohere(int depth, ll def, int i, int j, int dx, int dy) {
  int x = i;
  int y = j;
  do {
    x += dx;
    y += dy;
  } while (x >= 0 && y >= 0 && x < size && y < size && !isrobot(x, y));

  if (x >= 0 && y >= 0 && x < size && y < size && isrobot(x, y)) {
    //move thing
    field[x - dx][y - dy] = field[i][j];
    field[i][j] = '.';
    ll idx = field2ll();
    if (visited.find(idx) == visited.end()) { //not visited yet
      q.push(intll(depth + 1, field2ll()));
      visited.insert(idx);
    }
    ll2field(def);
  }
}

int solve_it(ll idx, unsigned int mw) { //returns the minimum number of steps to solve a level
  visited.clear();
  while (!q.empty()) q.pop();

  q.push(intll(0, idx));
  visited.insert(idx);

  //BFS
  while (!q.empty()) {
    intll cur = q.front();
    q.pop();

    ll2field(cur.second);

    if (field[size / 2][size / 2] == 'S') {
      //printf("solved field in %d steps\n", cur.first);
      return cur.first;
    }

    if (q.size() > mw) {
      return -cur.first; //this riddle is hard
    }

    for (int i = 0; i < size; i++)
      for (int j = 0; j < size; j++)
        if (isrobot(i, j)) {
          //try to go everywhere possible
          gohere(cur.first, cur.second, i, j, 1, 0);
          gohere(cur.first, cur.second, i, j, -1, 0);
          gohere(cur.first, cur.second, i, j, 0, 1);
          gohere(cur.first, cur.second, i, j, 0, -1);
        }
  };
  printf("could not solve it\n"); //this should never happen
  return -1;
}
