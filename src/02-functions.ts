import { Friend, Colleague, EmailContact } from './myTypes'
import { friends } from './01-basics'
import { colleagues } from './01-basics'

//Takes a Friend, increases their age by 1, and returns a string stating their name and new age
function older(f: Friend) {
  f.age += 1;
  return `${f.name} is now ${f.age}`;
}

console.log(older(friends[0]))

// Takes an array of colleagues, sorts them by their contact extension number, and returns the colleague with the highest extension number
function highestExtension(cs: Colleague[]) {
  const result = cs.sort(
    //compares two colleagues (c1 and c2) by subtracting their extension numbers, allowing .sort() to arrange them from lowest to highest extension
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  //returns the last item in the result array, which is the colleague with the highest extension number
  return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

function addColleague(
  cs: Colleague[],
  name: string,
  department: string,
  email: string
) {
  const highest = highestExtension(cs);

  const newColleague = {
    name: name,
    department: department,
    contact: {
      email: email,
      extension: highest.contact.extension + 1
    }
  };

  cs.push(newColleague);
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max : number
): EmailContact[] {
  const end = max < 2 ? 1 : max
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));

function findFriends(
  fs: Friend[],
  criterion: (friend: Friend) => boolean
): string[] {
  const result = fs.filter(criterion);
  return result.map((friend) => friend.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));
