import { utilService } from "../services/util.service";

export function MovesList({ title, moves }) {
    return (
        <section className="moves-list">
            <h1>{ title }</h1>
            <ul className="clean-list">
                {
                    moves.map((move, idx) =>
                        <li key={idx}>
                            <h4>To: {move.to}</h4>
                            <p>At: {utilService.getDate(move.at)}</p>
                            <p>Amount: {move.amount} coins</p>
                        </li>)
                }
            </ul>
        </section>
    )
}