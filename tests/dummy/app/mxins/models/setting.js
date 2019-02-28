import DS from 'ember-data';
import Mixin from '@ember/object/mixin';

/**
 * 
 *              Api-entity.
 *              Provides access to a client settings.
 *              
 *              Some properties are not tracked by this entity, i.e. changes are not propagated to the cache or the database.
 *              Usually such properties are just proxies to other entities, therefore they can be changed through other dbMetaData classes.
 *              If not mentioned otherwise, properties are tracked.
 *             
 *              Maps directly to the db-entity Reference(T:BackRohr.Data.Db.Models.ClientSetting).
 *              
 * 
 * START Reference(T:BackRohr.Data.Db.Models.ClientSetting)
 * 
 *             Table-Name: ClientSettings.
 *             Database-entity.
 *             Client settings key-value-pairs. Each client can store string key-value-pairs in a structure of their choice for each user.
 *             Implements Reference(T:Bitbird.Core.IId`1) with T=long.
 *             
 * END Reference(T:BackRohr.Data.Db.Models.ClientSetting)
 * 
 * 
 * START Reference(T:Bitbird.Core.IId`1)
 * 
 *             An object that can be uniquely identified among other objects of the same type by an id.
 *             
 * END Reference(T:Bitbird.Core.IId`1)
 * 
 *
 * @kind class
 * @name app.mixins.models.setting
 * @public
 */
export default Mixin.create({
  
  /**
   * 
   *             See Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client) for more info.
   *             Maps directly to db-entity.
   *             Not tracked during updates.
   *             
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client)
   * 
   *             An identifier for the client (e.g. "ie").
   *             Cannot be null.
   *             Max-length: 5.
   *             Must match the regex-pattern: "([a-zA-Z0-9_.]+)".
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client)
   * 
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId)
   * 
   *             A link to the user for which this setting is stored.
   *             Cannot be null.
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId)
   * 
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key)
   * 
   *             The key for this setting (e.g. "IsSectionXXXVisible").
   *             Cannot be null.
   *             Max-length: 50.
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key)
   * 
   *
   * @property {client}
   * @type {string}
   * @public
   * @memberof app.mixins.models.setting
   */
  client: DS.attr('string'),
  
  /**
   * 
   *             See Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key) for more info.
   *             Maps directly to db-entity.
   *             Not tracked during updates.
   *             
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key)
   * 
   *             The key for this setting (e.g. "IsSectionXXXVisible").
   *             Cannot be null.
   *             Max-length: 50.
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key)
   * 
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId)
   * 
   *             A link to the user for which this setting is stored.
   *             Cannot be null.
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId)
   * 
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client)
   * 
   *             An identifier for the client (e.g. "ie").
   *             Cannot be null.
   *             Max-length: 5.
   *             Must match the regex-pattern: "([a-zA-Z0-9_.]+)".
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client)
   * 
   *
   * @property {key}
   * @type {string}
   * @public
   * @memberof app.mixins.models.setting
   */
  key: DS.attr('string'),
  
  /**
   * 
   *             See Reference(P:BackRohr.Data.Db.Models.ClientSetting.Value) for more info.
   *             Maps directly to db-entity.
   *             
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Value)
   * 
   *             The value to store for this setting.
   *             Cannot be null.
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Value)
   * 
   *
   * @property {value}
   * @type {string}
   * @public
   * @memberof app.mixins.models.setting
   */
  value: DS.attr('string'),
  
  
  /**
   * 
   *             See Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) for more info.
   *             Maps directly to db-entity.
   *             Not tracked during updates.
   *             
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId)
   * 
   *             A link to the user for which this setting is stored.
   *             Cannot be null.
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId)
   * 
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client)
   * 
   *             An identifier for the client (e.g. "ie").
   *             Cannot be null.
   *             Max-length: 5.
   *             Must match the regex-pattern: "([a-zA-Z0-9_.]+)".
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Client)
   * 
   * 
   * START Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key)
   * 
   *             The key for this setting (e.g. "IsSectionXXXVisible").
   *             Cannot be null.
   *             Max-length: 50.
   *             Must be unique in combination with Reference(P:BackRohr.Data.Db.Models.ClientSetting.UserId) and Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key).
   *             
   * END Reference(P:BackRohr.Data.Db.Models.ClientSetting.Key)
   * 
   *
   * @property {user}
   * @type {app.mixins.models.user}
   * @public
   * @memberof app.mixins.models.setting
   */
  user: DS.belongsTo('user', { inverse: null }),
  
});