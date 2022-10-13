import Header from '../components/Header';
import Main from '../components/Main';
import Investment from './../components/Investment';
import Investments from './../components/Investments';
import { investments } from './../data/investments';

export default function ReactInvestmentsPage() {
    return (
      <div>
        <Header>React Investments</Header>
        <Main>
          <Investments>
            {investments.map(investimentItem => {
                return (
                  <Investment key={investimentItem.id} id={investimentItem.id}>
                    <h2 className="text-2xl mb-4 text-center font-semibold">{investimentItem.description}</h2>
                  </Investment>
                )
            })}
          </Investments>
        </Main>
      </div>
    )
  }  