import Month from "./Month";
import { reports } from "../data/investments";
import { floatNumberToBr, getColorClassName, getMonthName } from './../helpers/Util';

export default function Investment ({ children: description = 'Fundo de investimentos', id = 0, monthNumber = 1 }){
    const investimentReport = reports.filter(report => report.investmentId === id).sort((a, b) => a.month - b.month);
    const yearColor = getColorClassName(getYearYield().percent);

    function getMonthYield(month, value){
        if(month === 1){
            return 0.00;
        } else {
            const pastMonthValue = investimentReport.find((invest) => invest.month === (month - 1)).value;
            const difference = (pastMonthValue - value) * -1;
            const percent = ((difference / pastMonthValue) * 100).toFixed(2);
            return `${percent > 0 ? '+' : ''}${percent}`;
        }
    }

    function getYearYield(){
        const januaryValue = investimentReport.find(invest => invest.month === 1).value;
        const decemberValue = investimentReport.find(invest => invest.month === 12).value;
        let difference = (januaryValue - decemberValue) * -1;
        const percent = ((difference / januaryValue) * 100);

        const str = `R$ ${floatNumberToBr(difference)} (${percent > 0 ? '+' : ''}${floatNumberToBr(percent)}%)`;

        return { difference, percent, str };
    }
    
    return (
        <div className="border rounded-lg p-4 mb-8">
            {description}
            
            <h3 className="text-xl font-semibold text-center mb-10">Rendimento total: <span className={yearColor}>{getYearYield().str}</span></h3>
            
            {investimentReport.map(investimentItem => {
                const {id, month, year, value} = investimentItem;
                const monthYield = getMonthYield(month, value);
                const monthColor = getColorClassName(monthYield);
                
                return (
                  <Month key={id}>
                    <div className="mb-4 border-b flex justify-between">
                        <div className="flex justify-start">
                            <p className="font-mono mr-6">{`${getMonthName(month)}/${year}`}</p>
                            <p className={`font-semibold ${monthColor}`}>{'R$ ' + floatNumberToBr(value)}</p>
                        </div>
                        <p className={`font-semibold ${monthColor}`}>{monthYield}%</p>
                    </div>
                  </Month>
                )
            })}
        </div>
    )
}