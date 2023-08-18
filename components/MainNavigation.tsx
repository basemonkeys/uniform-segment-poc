import classNames from 'classnames';
import {
  ComponentProps,
  registerUniformComponent,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  getProjectMapClient,
  isDraftModeEnabled,
  isOnVercelPreviewEnvironment
} from '@uniformdev/canvas-next-rsc';

type Props = ComponentProps<{
  // colorStyle: Types.AvailableColor;
  displayRootNode: boolean;
  displayPlaceholderNodes: boolean;
  // separator: linkSeparator;
}>;

export const getProjectNodes = async ({
  compositionId,
  searchParams,
}: {
  compositionId: string;
  searchParams?: { [key: string]: string | undefined };
}) => {
  const projectMapClient = getProjectMapClient();

  const draftMode = isDraftModeEnabled({
    searchParams,
  });
  const previewEnvironment = isOnVercelPreviewEnvironment();

  const { nodes: projectMapNodes } = await projectMapClient.getNodes({
    compositionId: compositionId,
    includeAncestors: true,
    state: draftMode || previewEnvironment ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE
  });

  return projectMapNodes?.map(node => ({
    name: node.name,
    path: node.path,
    type: node.type,
    isRoot: node.path === '/',
  }));
};

const MainNavigation = async ({
  // colorStyle,
  displayPlaceholderNodes,
  displayRootNode,
  // separator,
  context
}: Props) => {
  const links = (
    await getProjectNodes({
      compositionId: context.composition._id,
      searchParams: context.searchParams,
    })
  ) || [];

  const linksToShow = links
    .filter((link: Types.ProjectMapLink) => (!displayRootNode ? !link.isRoot : true))
    .filter((link: Types.ProjectMapLink) =>
      !displayPlaceholderNodes ? link?.type !== 'placeholder' : true
    );

  return (
    // <div key={`links-${linksToShow.length}`} className={classNames('text-sm', getColorStyle(colorStyle))}>
    <div key={`links-${linksToShow.length}`} className={classNames('text-sm')}>
      <ul className="flex items-center">
        {linksToShow?.map((link: Types.ProjectMapLink, index) => (
          <li className="flex items-center" key={link?.path}>
            {/* {!!index && <div className="mx-2">{getSeparator(separator)}</div>} */}
            {link?.type === 'placeholder' ? (
              <span>{link.name}</span>
            ) : (
              <a href={link?.path}>{link.name}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

registerUniformComponent({
  type: 'main-navigation',
  component: MainNavigation as any,
});

export default MainNavigation;