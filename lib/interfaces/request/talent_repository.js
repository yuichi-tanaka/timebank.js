
const df = require('dateformat');
const IRequestHandler = require('./request_handler');
const ITalentRepository = require('../../usecases/talent_repository');
const TalentEntity = require('../../entities/talent');
const StatusEntity = require('../../entities/status');
const handle = Symbol('handle');

class TalentRepository extends ITalentRepository {
  constructor(_handle) {
    super();
    if(!(_handle instanceof IRequestHandler)) {
      throw new Error("handle must inherits IRequestHandler");
    }
    this[handle] = _handle;
  }

  async fetch(jwt) {
    const result = await this[handle].request(['talents'], {'authorization': jwt});
    if( result.get_status() != 200) return;

    const talents = result.get_body().talents;
    let res_talents = [];
    for( let t of talents ) {
      let talent = new TalentEntity(
          t.talent_id,
          t.talent_name,
          t.floating_second,
          t.subscription_price,
          t.status.current_price,
      );
      talent.status = new StatusEntity(
        t.status.opening_price,
        t.status.closing_price,
        t.status.high,
        t.status.low,
        t.status.volume,
        t.status.turnover,
        df(new Date(), 'yyyy-mm-dd')
      );
      res_talents.push(talent);
    }
    return res_talents;
  }

  async history(jwt, talent_id) {
    const result = await this[handle].request(['talents', talent_id, 'histories'], {'authorization': jwt});
    if( result.get_status() != 200) return;

    const t = result.get_body().talent;
    let talent = new TalentEntity(
      t.talent_id,
      t.talent_name,
      t.floating_second,
      t.subscription_price,
      t.status.current_price,
    );
    talent.status = new StatusEntity(
      t.status.opening_price,
      t.status.closing_price,
      t.status.high,
      t.status.low,
      t.status.volume,
      t.status.turnover,
      df(new Date(), 'yyyy-mm-dd')
    );
    const histories = result.get_body().histories;
    talent.histories = [];
    for( let h of histories) {
      const s = new StatusEntity(
        h.status.opening_price,
        h.status.closing_price,
        h.status.high,
        h.status.low,
        h.status.volume,
        h.status.turnover,
        h.date
      );
      talent.histories.push(s);
    }
    return talent;
  }
}
module.exports = TalentRepository;
