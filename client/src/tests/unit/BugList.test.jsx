// src/tests/unit/BugList.test.jsx
import { render, screen } from '@testing-library/react';
import BugList from '../../components/bugList.jsx';

describe('BugList Component', () => {
  it('renders no bugs message', () => {
    render(<BugList bugs={[]} />);
    expect(screen.getByText(/no bugs found/i)).toBeInTheDocument();
  });

  it('renders a list of bugs', () => {
    const bugs = [
      { title: 'Bug 1', description: 'Desc 1', type: 'UI', status: 'Open' },
      { title: 'Bug 2', description: 'Desc 2', type: 'Backend', status: 'Resolved' },
    ];

    render(<BugList bugs={bugs} />);
    expect(screen.getByText(/bug 1/i)).toBeInTheDocument();
    expect(screen.getByText(/bug 2/i)).toBeInTheDocument();
  });
});
