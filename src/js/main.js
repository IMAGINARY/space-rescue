import SpaceApp from '../../app/SpaceApp';

$('[data-component=game]').each((_, container) => {
  const game = new SpaceApp();
  $(container).append(game.domElement);
});

