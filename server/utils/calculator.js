/**
 * Algorithm to calculate individual contribution percentage
 * Based on hours logged relative to total project hours.
 */
const calculateContribution = (tasks) => {
  const totalHours = tasks.reduce((acc, task) => acc + task.hoursLogged, 0);
  
  if (totalHours === 0) return [];

  const contributionMap = {};

  tasks.forEach(task => {
    const userId = task.assignedTo.toString();
    contributionMap[userId] = (contributionMap[userId] || 0) + task.hoursLogged;
  });

  return Object.keys(contributionMap).map(userId => ({
    userId,
    percentage: ((contributionMap[userId] / totalHours) * 100).toFixed(2)
  }));
};

module.exports = { calculateContribution };